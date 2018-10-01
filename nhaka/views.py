from django.shortcuts import render,redirect
from django.core.mail import send_mail
from django.views.generic.list import ListView
from .models import Course, Content
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView, \
                                    DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, \
                                        PermissionRequiredMixin
from django.views.generic.base import TemplateResponseMixin, View
from django.shortcuts import redirect, get_object_or_404
from .forms import ModuleFormSet
from django.forms.models import modelform_factory
from django.apps import apps
from .models import Module, Content
from braces.views import CsrfExemptMixin, JsonRequestResponseMixin
from django.db.models import Count
from .models import Subject,Grade
from django.views.generic.detail import DetailView
from students.forms import CourseEnrollForm
from django.core.cache import cache
from payments.models import PaynowPayment
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
# from django.core.urlresolvers import reverse_lazy
from django.views import generic
from .forms import LoginForm
from django.contrib import messages
import requests 
# Create your views here.


def index(request):
    print("Hello world!!!!")
    return render(request, 'nhaka/index.html')


def home(request):
   
    return render(request, 'courses/course/home.html')
           
class LoginView(generic.FormView):
    form_class = LoginForm
    success_url = reverse_lazy('home')
    template_name = 'registration/login.html'

    def form_valid(self, form):
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = authenticate(username=username, password=password)

        pay = PaynowPayment.objects.filter(status="paid")

        for payment in pay:
            if (user.id == payment.user_id):
                print(user.id)
                print(payment.user_id)
                print("ndasvika")
                login(self.request, user)
                return super(LoginView, self).form_valid(form)

        # if user is not None and user.is_active:
        #     login(self.request, user)
        #     return super(LoginView, self).form_valid(form)
            else:
                print("zvaramba")
                return self.form_invalid(form)       
   



class ManageCourseListView(ListView):
    model = Course
    template_name = 'courses/manage/course/list.html'

    def get_queryset(self):
        qs = super(ManageCourseListView, self).get_queryset()
        return qs.filter(owner=self.request.user)


class OwnerMixin(object):
    def get_queryset(self):
        qs = super(OwnerMixin, self).get_queryset()
        return qs.filter(owner=self.request.user)

class OwnerEditMixin(object):
    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super(OwnerEditMixin, self).form_valid(form)

class OwnerCourseMixin(OwnerMixin, LoginRequiredMixin):
    model = Course
    fields = ['subject','grade', 'title', 'slug', 'overview']
    success_url = reverse_lazy('manage_course_list')


class OwnerCourseEditMixin(OwnerCourseMixin, OwnerEditMixin):
    fields = ['subject', 'grade' ,'title', 'slug', 'overview']
    success_url = reverse_lazy('manage_course_list')
    template_name = 'courses/manage/course/form.html'

class ManageCourseListView(OwnerCourseMixin, ListView):
    template_name = 'courses/manage/course/list.html'

class CourseCreateView(PermissionRequiredMixin,OwnerCourseEditMixin, CreateView):
    permission_required = 'courses.add_course'

class CourseUpdateView(PermissionRequiredMixin,OwnerCourseEditMixin, UpdateView):
    permission_required = 'courses.change_course'

class CourseDeleteView(PermissionRequiredMixin,OwnerCourseMixin, DeleteView):
    template_name = 'courses/manage/course/delete.html'
    success_url = reverse_lazy('manage_course_list')
    permission_required = 'courses.delete_course'


# formset view...allows us to hv multiple forms on a single page
class CourseModuleUpdateView(TemplateResponseMixin, View):
    template_name = 'courses/manage/module/formset.html'
    course = None

    def get_formset(self, data=None):
        return ModuleFormSet(instance=self.course, data=data)


    def dispatch(self, request, pk):
        self.course = get_object_or_404(Course,
                                        id=pk,
                                        owner=request.user)
        return super(CourseModuleUpdateView,
                    self).dispatch(request, pk)
    
    def get(self, request, *args, **kwargs):
        formset = self.get_formset()
        return self.render_to_response({'course':self.course,
                                        'formset':formset})
    
    def post(self, request, *args, **kwargs):
        formset = self.get_formset(data=request.POST)
        if formset.is_valid():
            formset.save()
            return redirect('manage_course_list')
        return self.render_to_response({'course':self.course,
                                        'formset':formset})


# View to add content to course
class ContentCreateUpdateView(TemplateResponseMixin, View):
    module = None
    model = None
    obj = None
    template_name = 'courses/manage/content/form.html'  
    
    # check if model name given is our four content models
    def get_model(self, model_name):
        if model_name in ['text', 'video','image','file']:
            return apps.get_model(app_label='nhaka',
                                    model_name = model_name)
        
        return None
    
    # dynamic form using modelform_factory 
    def get_form(self, model, *args, **kwargs):
        Form = modelform_factory(model, exclude=['owner',
                                                'order',
                                                'created',
                                                'updated'])
        return Form(*args, **kwargs)

    # dispatch works to receive URL parameters
    def dispatch(self, request, module_id, model_name, id=None):
        self.module = get_object_or_404(Module,
                                        id=module_id,
                                        course__owner=request.user)
        self.model = self.get_model(model_name)
        if id:
            self.obj = get_object_or_404(self.model,
                                            id=id,
                                            owner=request.user)
        
        return super(ContentCreateUpdateView,
                    self).dispatch(request, module_id, model_name,id)

    # this function/method is executed when a get request is received
    def get(self, request, module_id, model_name, id=None):
        form = self.get_form(self.model, instance = self.obj)
        return self.render_to_response({'form':form,
                                        'object':self.obj})
    # this function/method is executed when a post request is received
    def post(self, request, module_id, model_name, id=None):
        form = self.get_form(self.model,
                            instance=self.obj,
                            data=request.POST,
                            files=request.FILES)
        
        if form.is_valid():
            obj = form.save(commit=False)
            obj.owner = request.user
            obj.save()
            if not id:
                #new content
                Content.objects.create(module=self.module,
                                        item=obj)
            return redirect('module_content_list', self.module.id)
        
        return self.render_to_response({'form':form,
                                        'object':self.obj})


#content deletion module
class ContentDeleteView(View):

    def post(self, request, id):
        content = get_object_or_404(Content,
                                    id=id,
                                    module__course__owner=request.user)
        module = content.module
        content.item.delete()
        content.delete()
        return redirect('module_content_list', module.id)



#Views to manage modules and contents
# this is more of a view to display all modules for a course

class ModuleContentListView(TemplateResponseMixin, View):
    template_name = 'courses/manage/module/content_list.html'


    def get(self, request, module_id):
        module = get_object_or_404(Module,
                                    id=module_id,
                                    course__owner=request.user)
        
        return self.render_to_response({'module':module})

# django-braces to reoder course content and modules after creating
class ModuleOrderView(CsrfExemptMixin,JsonRequestResponseMixin,View):
    def post(self, request):
        for id,order in self.request_json.items():
            Module.objects.filter(id=id,
                                    course__owner=request.user).update(order=order)
        
        return self.render_json_response({'saved':OK})

# THIS IS TO ORDER CONTENT
class ContentOrderView(CsrfExemptMixin,JsonRequestResponseMixin,View):
    def post(self, request):
        for id,order in self.request_json.items():
            Content.objects.filter(id=id,
                                    module__course__owner=request.user)\
                                    .update(order=order)

        return self.render_json_response({'saved':OK}) 

   
# displaying courses to students
# in this view we retrieve all subjects, including total number of courses

class CourseListView(TemplateResponseMixin,View):
    model = Course
    template_name = 'courses/course/list.html'


    def get(self, request, subject=None):
        subjects = cache.get('all_subjects')
        if not subjects:
            subjects = Subject.objects.annotate(
                           total_courses=Count('courses'))
            cache.set('all_subjects', subjects)
        all_courses = Course.objects.annotate(
                                   total_modules=Count('modules'))
        
        grades = cache.get('all_grades')
        if not grades:
            grades = Grade.objects.annotate(
                            total_courses = Count('courses'))
       
        if subject:
            subject = get_object_or_404(Subject, slug=subject)
            key = 'subject_{}_courses'.format(subject.id)
            courses = cache.get(key)
            if not courses:
                courses = all_courses.filter(subject=subject)
                cache.set(key, courses)
        else:
            courses = cache.get('all_courses')
            if not courses:
                courses = all_courses
                cache.set('all_courses', courses)
        return self.render_to_response({'subjects':subjects,
                                        'subject': subject,
                                        'courses': courses})


# detail view
class CourseDetailView(DetailView):
    model = Course
    template_name = 'courses/course/detail.html'

    def get_context_data(self, **kwargs):
        context = super(CourseDetailView,
                        self).get_context_data(**kwargs)
        context['enroll_form'] = CourseEnrollForm(
                                    initial = {'course':self.object})
        
        return context
    

        



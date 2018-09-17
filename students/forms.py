from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from nhaka.models import Course




Grades = ('1','2','3','4','5','6','7')

# course enrolment form
# this form is going to be used in CourseDetailView i.e to display enroll button
class CourseEnrollForm(forms.Form):
    course = forms.ModelChoiceField(queryset=Course.objects.all(),
                                    widget=forms.HiddenInput)




class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    birth_date= forms.DateField(widget=forms.SelectDateWidget)
    

    class Meta:
        model = User
        fields = ('username',
                 'first_name',
                 'last_name',
                 'email',
                 'birth_date',
                 'password1',
                 'password2')

    def save(self,commit=True):
        user = super(RegistrationForm,self).save(commit=False)
        


        if commit:
            user.save()

        return user
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from nhaka.models import Course, Grade





Grades = (('grade_1', 'grade_1'), ('grade_2','grade_2'),('grade_3','grade_3'),('grade_4','grade_4'),('grade_5','grade_5'),('grade_6','grade_6'),('grade_7','grade_7'))
    

# course enrolment form
# this form is going to be used in CourseDetailView i.e to display enroll button
class CourseEnrollForm(forms.Form):
    course = forms.ModelChoiceField(queryset=Course.objects.all(),
                                    widget=forms.HiddenInput)





class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    birth_date= forms.DateField(widget=forms.SelectDateWidget)
    grade = forms.ChoiceField( choices=Grades)

    class Meta:
        model = User
        fields = ('username',
                 'first_name',
                 'last_name',
                 'email',
                 'birth_date',
                 'grade',
                 'password1',
                 'password2')

    def save(self,commit=True):
        user = super(RegistrationForm,self).save(commit=False)
        


        if commit:
            user.save()

        return user
from django import forms
from django.forms.models import inlineformset_factory
from .models import Course, Module
from django.contrib.auth.forms import AuthenticationForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit



ModuleFormSet = inlineformset_factory(Course,
                                      Module,
                                      fields=['title',
                                              'description',
                                              'thumbnail'],
                                       extra=2,
                                       can_delete=True)

class LoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.layout = Layout(
            'username',
            'password',
            ButtonHolder(
                Submit('login', 'Login', css_class='btn-primary')
            )
        )

                                       

                                
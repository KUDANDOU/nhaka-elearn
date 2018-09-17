# this is our model_name filter
# can be applied  in templates as object|model_name 
# i.e to get the model name for an object

from django import template

register = template.Library()

@register.filter
def model_name(obj):
    try:
        return obj._meta.model_name
    except AttributeError:
        return None
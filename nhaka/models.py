from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from .fields import OrderField
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe


class Subject(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    image = models.ImageField(upload_to='subjects/%Y/%m/%d',blank=True)
    description = models.TextField(blank=True)
    

    class Meta:
        ordering = ['title']    
        
    def __str__(self):
        return self.title

class Grade(models.Model):
    title = models.CharField(max_length=200)
    slug  = models.SlugField(max_length=200, unique=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title 
        
class Course(models.Model):
    owner = models.ForeignKey(User,
                             related_name='courses_created',
                             on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject,
                                related_name='courses',
                                on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade,
                            related_name='courses',
                            on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    overview = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    students = models.ManyToManyField(User,
                                    related_name='courses_joined',
                                    blank=True)
    
    class Meta:
        ordering = ['-created']
    
    def __str__(self):
        return self.title
        
class Module(models.Model):
    course = models.ForeignKey(Course,
                             related_name='modules',
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    thumbnail = models.FileField(upload_to='module/%Y/%m/%d',null=True, blank=True)
    order = OrderField(blank=True, for_fields=['course'])

    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return '{}. {}'.format(self.order, self.title)

# this model will allow us to store diverse content
class Content(models.Model):
    module = models.ForeignKey(Module, related_name='contents',on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType,
                                    on_delete=models.CASCADE,
                                    limit_choices_to={'model__in':('text',
                                                                    'video',
                                                                    'image',
                                                                    'file')})
    object_id = models.PositiveIntegerField()
    item =  GenericForeignKey('content_type','object_id')
    order = OrderField(blank=True, for_fields=['module'])

    class Meta:
        ordering = ['order']

# going to create an abstract model which provides common fields for all content models

class ItemBase(models.Model):
    owner = models.ForeignKey(User,
                            related_name='%(class)s_related', on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    # function to render different types of content
    def render(self):
        return render_to_string('courses/content/{}.html'.format(
                        self._meta.model_name), {'item': self})

    class Meta:
        abstract = True

    def __str__(self):
        return self.title

# the following are the content models inheriting from itembase

class Text(ItemBase):
    content = models.TextField()

class File(ItemBase):
    file = models.FileField(upload_to='files')

class image(ItemBase):
    file = models.FileField(upload_to='images')

class Video(ItemBase):
    name = models.CharField(max_length=500)
    videofile = models.FileField(upload_to='videos/',null=True,verbose_name="")

    def __str__(self):
        return self.name + ": "+ str(self.videofile)




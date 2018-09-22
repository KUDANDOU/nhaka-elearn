from django.conf.urls import url

from . import views

urlpatterns = [
    
    url('my_profile/', views.my_profile, name='my_profile'),
    
    url('confirmed_payments/', views.confirmed_payments,name='confirmed_payments'),
    url('unconfirmed_payments/', views.unconfirmed_payments,name='unconfirmed_payments'),

    url('paynow_payment/', views.paynow_payment, name="paynow_payment"),
    #
    url('paynow_return/(?P<order_id>\w+)', views.paynow_return,name="paynow_return"),
    #
    url('paynow_update/(?P<order_id>\w+)', views.paynow_update,name="paynow_update"),
    ]
"""firstproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.post_list, name='post_list'),

    url(r'^accounts/register/$', views.register, name='register'),
    url(r'^accounts/register/complete/$', views.registration_complete, name='registration_complete'),
    

    url(r'^asia/$', views.post_asia, name='post_asia'),
    url(r'^europe/$', views.post_europe, name='post_europe'),
    url(r'^america/$', views.post_america, name='post_america'),
    url(r'^etc/$', views.post_etc, name='post_etc'),
    
    url(r'^post/(?P<post_id>[0-9]+)/$', views.post_detail, name = 'post_detail'),
    url(r'^post/new/$', views.post_new, name = 'post_new'),
    url(r'^post/(?P<post_id>[0-9]+)/edit/$', views.post_edit, name = 'post_edit'),
    url(r'^drafts/$', views.post_draft_list, name = 'post_draft_list'),
    url(r'^post/(?P<post_id>[0-9]+)/publish/$', views.post_publish, name = 'post_publish'),
    url(r'^post/(?P<post_id>[0-9]+)/remove/$', views.post_remove, name = 'post_remove'),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login'),
    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout', {'next_page':'/'}),
    url(r'^post/(?P<pk>[0-9]+)/comment/$', views.add_comment_to_post, name='add_comment_to_post'),
    url(r'^comment/(?P<pk>[0-9]+)/approve/$', views.comment_approve, name='comment_approve'),
    url(r'^comment/(?P<pk>[0-9]+)/remove/$', views.comment_remove, name='comment_remove'),
]

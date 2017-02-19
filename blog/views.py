from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.forms import UserCreationForm
from django.core.context_processors import csrf
from django.utils import timezone
from .models import Post, Comment
from .forms import PostForm, CommentForm
from django.contrib.auth.decorators import login_required

def post_list(request):
    posts = Post.objects.filter(published_date__lte = timezone.now()).order_by('-published_date')
    return render(request, "blog/main_post_list.html", {'posts' : posts})

def post_asia(request):
    posts = Post.objects.filter(published_date__lte = timezone.now()).order_by('-published_date')
    return render(request, "blog/asia_post_list.html", {'posts' : posts})

def post_europe(request):
    posts = Post.objects.filter(published_date__lte = timezone.now()).order_by('-published_date')
    return render(request, "blog/europe_post_list.html", {'posts' : posts})

def post_america(request):
    posts = Post.objects.filter(published_date__lte = timezone.now()).order_by('-published_date')
    return render(request, "blog/america_post_list.html", {'posts' : posts})

def post_etc(request):
    posts = Post.objects.filter(published_date__lte = timezone.now()).order_by('-published_date')
    return render(request, "blog/etc_post_list.html", {'posts' : posts})

def post_detail(request, post_id):
    post = get_object_or_404(Post, pk = post_id)
    return render(request, 'blog/post_detail.html', {'post' : post})

@login_required
def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit = False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect('blog.views.post_detail', post_id = post.pk)
        
    else:
        form = PostForm()
        
    return render(request, 'blog/post_new.html', {'form':form})

def post_edit(request, post_id):
    post = get_object_or_404(Post, pk = post_id)
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit = False)
            post.author = request.user
            post.pk = post_id
            post.published_date = timezone.now()
            post.save()
            return redirect('blog.views.post_detail', post_id = post.pk)

    else:
        form = PostForm(instance = post)

    return render(request, 'blog/post_edit.html', {'form':form})

def post_draft_list(request):
    posts = Post.objects.filter(published_date__isnull=True).order_by('created_date')
    return render(request, 'blog/post_draft_list.html', {'posts' : posts})

def post_publish(request, post_id):
    post = get_object_or_404(Post, pk = post_id)
    post.publish()
    return redirect('blog.views.post_detail', post_id = post_id)

def post_remove(request, post_id):
    post = get_object_or_404(Post, pk = post_id)
    post.delete()
    return redirect('blog.views.post_list')

def add_comment_to_post(request, pk):
    post = get_object_or_404(Post, pk = pk)
    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit = False)
            comment.post = post
            comment.approve()
            comment.save()
            return redirect('blog.views.post_detail', post_id=post.pk)
    else:
        form = CommentForm()
        return render(request, 'blog/add_comment_to_post.html', {'form': form})

@login_required
def comment_approve(request, pk):
    comment = get_object_or_404(Comment, pk = pk)
    comment.approve()
    return redirect('blog.views.post_detail', post_id = comment.post.pk)

@login_required
def comment_remove(request, pk):
    comment = get_object_or_404(Comment, pk = pk)
    post_pk = comment.post.pk
    comment.delete()
    return redirect('blog.views.post_detail', post_id = post_pk)

def register(request):
    if request.method == 'POST':
         form = UserCreationForm(request.POST)
         if form.is_valid():
             form.save()
             return HttpResponseRedirect('/accounts/register/complete')

    else:
        form = UserCreationForm()
    token = {}
    token.update(csrf(request))
    token['form'] = form

    return render('registration/registration_form.html', token)

def registration_complete(request):
    return render('registration/registration_complete.html')


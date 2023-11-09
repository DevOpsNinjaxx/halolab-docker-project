from rest_framework import status
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer
from rest_framework.response import Response
from rest_framework import status  # Import status
import requests

class PostAPIView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response([self.formatPost(p) for p in posts])

    def formatPost(self, post):
        # Use the service name as the hostname
        comments = requests.get('http://127.0.0.1:8000/api/posts/%d/comments' % post.id)
        return {
            'id': post.id,
            'title': post.title,
            'description': post.description,
            'comments': comments
        }

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            post.delete()
            return Response({"message": "Post deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

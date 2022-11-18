
import { map, mergeMap, switchMap, filter } from 'rxjs/operators';
import { loadPosts, loadPostsSuccess, addPost, addPostSuccess, updatePost, updatePostSuccess, deletePost, deletePostSuccess } from './posts.actions';
import { PostsService } from './../../services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  RouterNavigatedAction,
  routerNavigationAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });

  // Opcion 1 - ver addPost metodo en el service --> public/src/app/services/posts.service.ts 
  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((post) => {
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  // Opcion 2 - ver addPost metodo en el service --> public/src/app/services/posts.service.ts
  // addPost$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(addPost),
  //     mergeMap((action) => {
  //       return this.postsService.addPost(action.post).pipe(
  //         map((post) => {
  //           const customPost = { post: { ...action.post, id: post.name } };
  //           return addPostSuccess(customPost);
  //         })
  //       );
  //     })
  //   );
  // });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });
  
  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction) => {
        // return r.payload.routerState['params']['id'];
        const currentId = isNaN(parseInt(r.payload.routerState.url.split("/")[3], 10)) ? "" : r.payload.routerState.url.split("/")[3];
        return currentId;
      }),
      switchMap((id) => {
        return this.postsService.getPostById(id).pipe(
          map((post) => {
            // const postData = [{ ...post, id }];
            // return loadPostsSuccess({ posts: postData });
            return loadPostsSuccess({ posts: [post] });
          })
        );
      })
    );
  });
}
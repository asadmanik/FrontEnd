import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  public getPosts(pageNo, size) {
    return this.httpClient.get(`https://localhost:44317/api/Posts/GetPosts`, {
      params: {
        pageNo: pageNo,
        size: size,
      },
    });
  }
  public updateLike(cmntId, postId) {
    const params = new URLSearchParams();
    params.set('cmntId', cmntId);
    params.set('postId', postId);

    return this.httpClient.post<any>(
      `https://localhost:44317/api/Posts/UpdateLike`,
      JSON.stringify({
        cmntId: cmntId,
        postId: postId,
      })
    );
  }
  public updateDisLike(cmntId, postId) {
    return this.httpClient.post(
      `https://localhost:44317/api/Posts/UpdateDisLike`,
      {
        cmntId: cmntId,
        postId: postId,
      }
    );
  }
}

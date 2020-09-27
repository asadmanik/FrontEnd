import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css'],
})
export class ShowPostsComponent implements OnInit {
  posts;
  config: any;
  maxPage = 0;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };
  constructor(private apiService: ApiService) {
    this.config = {
      itemsPerPage: 2,
      pageNo: 1,
      currentPage: 1,
    };
  }

  ngOnInit(): void {
    this.apiService
      .getPosts(this.config.currentPage, this.config.itemsPerPage)
      .subscribe((data) => {
        this.posts = data;
        this.maxPage = this.posts.length / this.config.itemsPerPage + 1;
      });
  }
  pageChanged(event) {
    this.config.currentPage = this.config.currentPage + 1;
    this.apiService
      .getPosts(this.config.currentPage, this.config.itemsPerPage)
      .subscribe((data) => {
        this.posts = data;
      });
  }

  prevClicked() {
    this.config.currentPage =
      this.config.currentPage > 1 ? this.config.currentPage - 1 : 1;
    this.apiService
      .getPosts(this.config.currentPage, this.config.itemsPerPage)
      .subscribe((data) => {
        this.posts = data;
      });
  }
  nextClicked() {
    this.config.currentPage =
      this.config.currentPage < this.maxPage
        ? this.config.currentPage + 1
        : this.maxPage;
    console.log(this.config.currentPage);
    this.apiService
      .getPosts(this.config.currentPage, this.config.itemsPerPage)
      .subscribe((data) => {
        this.posts = data;
      });
  }
  counter(i: number) {
    return new Array(i);
  }

  likeComment(CommentId, PostId) {
    this.apiService.updateLike(CommentId, PostId).subscribe((data) => {
      console.log();
    });
  }
  dislikeComment(CommentId, PostId) {
    this.apiService.updateDisLike(CommentId, PostId).subscribe((data) => {
      console.log();
    });
  }
}

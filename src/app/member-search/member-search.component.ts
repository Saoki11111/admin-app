import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
  members$: Observable<Member[]>;
  private searchTerms = new Subject<string>(); // Observable を継承している

  constructor(private memberService: MemberService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(
      // キーボード入力の後、300ms 待って次の実行に移る
      // キーボードの連続入力のとき発生するイベントを間引く
      debounceTime(300),

      // 直前のデータと同じ場合は処理を実行しない
      // 同じキーワードが入力されたときむだな通信は発生しないは処理しない
      distinctUntilChanged(),

      // 検索キーワードを受けるたびに、新しい Observable を返す
      // searchTerms Observable は 検索キーワードが渡ってくる
      // 検索キーワードを受け取り、callBack で searchMembsers メソッドにキーワードを渡し、
      // HTTP request を実行 → Observable が返される
      // switchMap で新しい members$ をセットする

      switchMap((term: string) => this.memberService.searchMembers(term))
    );
  }

}

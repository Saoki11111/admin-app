import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];
  selectedMember: Member;

  constructor(
    private memberService: MemberService,
    private MessageService: MessageService
    ) { }

  ngOnInit(): void {
    this.getMembers();
  }

  onSelect(member: Member): void {
    this.selectedMember = member;
    this.MessageService.add(`MembersComponent: 社員データ(id=${member.id})が選択されました`);
  }

  getMembers(): void {
    this.memberService.getMembers() // Observable
      .subscribe(members => this.members = members);
  }
}

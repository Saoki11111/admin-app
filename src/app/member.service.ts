import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }

  getMembers(): Member[] {
    return MEMBERS;
  }
}

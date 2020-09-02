import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormHelperService } from '../../app-services/form-helper.service';
import { forkJoin } from 'rxjs';
import { CommonReferenceBookService } from '../../app-services/common-reference-book.service';

declare var Chart: any;

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss']
})

export class DashboardDetailComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private commonReferenceBookService: CommonReferenceBookService,
    private activatedRoute: ActivatedRoute,
    private formHelperService: FormHelperService) { }


  ngOnInit() {
  }
}

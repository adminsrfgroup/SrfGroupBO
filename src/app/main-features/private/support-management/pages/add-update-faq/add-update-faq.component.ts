import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {IFaqState} from "../../store/state/support.state";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {IFaq} from "../../../../../shared/models/faq.model";
import {addFaq, resetFaq} from "../../store/actions/faq.actions";
import {selectorFaq} from "../../store/selectors/support.selectors";

@Component({
  selector: 'app-add-update-faq',
  templateUrl: './add-update-faq.component.html',
  styleUrls: ['./add-update-faq.component.scss']
})
export class AddUpdateFaqComponent implements OnInit, OnDestroy{

  formGroup!: FormGroup;

  idEntity = signal<number>(-1);

  store = inject(Store<IFaqState>);

  destroy$: Subject<boolean> = new Subject<boolean>();

  router = inject(Router);

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.initForm();

    this.store
      .select(selectorFaq)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: IFaqState) => {
          console.log('result ', result);

          if (result.addSuccess || result.updateSuccess) {
            this.store.dispatch(resetFaq());
            this.router.navigate(['/private/support/list-faq']).then();
          }

          if (this.idEntity() && result.entity) {
            // Update form
            // this.formGroup.patchValue({
            //   contentAr: result.entity.contentAr,
            //   contentFr: result.entity.contentFr,
            //   contentEn: result.entity.contentEn
            // })
          }
        },
      });
  }

  private initForm(){
    this.formGroup = this.fb.group({
      questionAr: new FormControl('', [Validators.required]),
      questionFr: new FormControl('', [Validators.required]),
      questionEn: new FormControl('', [Validators.required]),
      responseAr: new FormControl('', [Validators.required]),
      responseFr: new FormControl('', [Validators.required]),
      responseEn: new FormControl('', [Validators.required])
    })
  }

  addUpdateFaq(): void{
    console.log('this.formGroup ', this.formGroup.getRawValue())
    if( this.formGroup.value ){
      const requestData: IFaq = {
        ...this.formGroup.getRawValue(),
      }
      this.store.dispatch(addFaq(requestData));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

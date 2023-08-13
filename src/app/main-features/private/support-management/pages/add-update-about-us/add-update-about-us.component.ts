import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {IAboutUsState} from "../../store/state/support.state";
import {IAboutUs} from "../../../../../shared/models/about-us.model";
import {addAboutUs, resetAboutUs} from "../../store/actions/about-us.actions";
import {Subject, takeUntil} from "rxjs";
import {selectorAbouttUs} from "../../store/selectors/support.selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-update-about-us',
  templateUrl: './add-update-about-us.component.html',
  styleUrls: ['./add-update-about-us.component.scss']
})
export class AddUpdateAboutUsComponent implements OnInit, OnDestroy{

  formGroup!: FormGroup;

  idEntity = signal<string | null>('');

  store = inject(Store<IAboutUsState>);

  destroy$: Subject<boolean> = new Subject<boolean>();

  router = inject(Router);

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.initForm();

    this.store
      .select(selectorAbouttUs)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: IAboutUsState) => {
          console.log('result ', result);

          if (result.addSuccess || result.updateSuccess) {
            this.store.dispatch(resetAboutUs());
            this.router.navigate(['/private/support/list-about-us']).then();
          }

          if (this.idEntity() && result.entity) {
            // Update form
          }
        },
      });
  }

  private initForm(){
    this.formGroup = this.fb.group({
      contentAr: new FormControl('', [Validators.required]),
      contentFr: new FormControl('', [Validators.required]),
      contentEn: new FormControl('', [Validators.required])
    })
  }

  addUpdateContent(): void{
    console.log("thid.form ", this.formGroup.getRawValue())
    if( this.formGroup.value ){
      const requestData: IAboutUs = {
        ...this.formGroup.getRawValue(),
      }
      this.store.dispatch(addAboutUs(requestData));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }




}
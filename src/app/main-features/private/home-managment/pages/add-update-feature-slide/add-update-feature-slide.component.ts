import { Component, OnDestroy, OnInit } from '@angular/core';
import { getBase64 } from '../../../../../shared/utils/utils-functions';
import { IPostHomeFeature } from '../../../../../shared/models/post-home-feature.model';
import { HomeState, IFeatureHome } from '../../store/state/init.state';
import { Store } from '@ngrx/store';
import { addFeatureSlide, resetFeatureSlide } from '../../store/actions/feature-home.actions';
import { selectorFeatureHome } from '../../store/selectors/home.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import {Editor, Toolbar} from 'ngx-editor';

@Component({
    selector: 'app-add-update-feature-slide',
    templateUrl: './add-update-feature-slide.component.html',
    styleUrls: ['./add-update-feature-slide.component.scss'],
})
export class AddUpdateFeatureSlideComponent implements OnInit, OnDestroy {
    idEntity!: number;

    fileState: string | undefined = '';

    descriptionAr: string | undefined = '';
    descriptionFr: string | undefined = '';
    descriptionEn: string | undefined = '';

    destroy$: Subject<boolean> = new Subject<boolean>();


    editorAr!: Editor;
    editorFr!: Editor;
    editorEn!: Editor;
    html = '';
    toolbar: Toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ['link', 'image'],
      ['text_color', 'background_color'],
      ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];


  constructor(private store: Store<HomeState>, private router: Router) {}

    ngOnInit() {

      this.editorAr = new Editor();
      this.editorFr = new Editor();
      this.editorEn = new Editor();

        this.store
            .select(selectorFeatureHome)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IFeatureHome) => {
                    console.log('result ', result);
                    if (result.addSuccess) {
                        this.store.dispatch(resetFeatureSlide());
                        this.router.navigate(['/private/home/list-feature-slide']);
                    }
                },
            });
    }

    selectFile(event: any) {
        if (event?.target?.files?.length) {
            getBase64(event.target.files[0]).then((result: any) => {
                this.fileState = result;
            });
        }
    }

    addUpdateFeatureSlide(): void {
        if (!this.fileState) {
            return;
        }

        const requestData: IPostHomeFeature = {
            descriptionAr: this.descriptionAr,
            descriptionFr: this.descriptionFr,
            descriptionEn: this.descriptionEn,
            image: this.fileState,
        };
        console.log('requestData ', requestData);
        this.store.dispatch(addFeatureSlide(requestData));
    }

    ngOnDestroy() {
      this.editorAr.destroy();
      this.editorFr.destroy();
      this.editorEn.destroy();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}

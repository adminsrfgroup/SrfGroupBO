import {AfterViewInit, Component, ElementRef, inject, signal, ViewChild, WritableSignal} from '@angular/core';
import {Store} from "@ngrx/store";
import {IOrganigrammeState} from "../../store/state/dashboard.state";
import {Subject, takeUntil} from "rxjs";
import {selectorOrganigramme} from "../../store/selectors/dashboard.selectors";
import {isEmpty} from "lodash";
import {addOrganigramme, loadOrganigramme, updateOrganigramme} from "../../store/actions/organigramme.actions";
import {IOrganigramme} from "../../../../../shared/models/organigramme.model";
declare const OrgChart: any;

@Component({
    selector: 'app-organigramme',
    templateUrl: './organigramme.component.html',
    styleUrls: ['./organigramme.component.scss'],
})
export class OrganigrammeComponent implements AfterViewInit {
    @ViewChild('chartContainer') chartContainer!: ElementRef;

    defaultListOrganisation = [
        { id: 1, name: 'Taki Eddine Rahal', title: 'CEO', img: './src/assets/images/defaults/avatar.png' },
        { id: 2, pid: 1, name: 'Aya Rahal', title: 'Sales Manager', img: './src/assets/images/defaults/avatar.png' },
    ];

    chart!: OrgChart;

    store = inject(Store<IOrganigrammeState>);
    destroy$: Subject<boolean> = new Subject<boolean>();

    isUpdate: WritableSignal<boolean> = signal<boolean>(false);

    idEntity: WritableSignal<number> = signal<number>(-1);

    ngAfterViewInit(): void {
        // this.store.dispatch(loadOrganigramme());
        this.store
            .select(selectorOrganigramme)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IOrganigrammeState) => {
                    console.log('result ', result);
                    if( isEmpty(result.entity) && !result.loading && !result.errorMessage?.error){
                        this.store.dispatch(loadOrganigramme());
                    }
                    else if(!isEmpty(result.entity)){
                        this.isUpdate.set(true);
                        this.idEntity.set(result.entity.id || -1);
                        this.defaultListOrganisation = JSON.parse(result.entity.content || '');
                        this.drawChart();
                    }

                    // First time without save in DB
                    if( isEmpty(result.entity) && !result.loading && result.errorMessage?.error ){
                        this.defaultListOrganisation = [
                            { id: 1, name: 'Taki Eddine Rahal', title: 'CEO', img: './src/assets/images/defaults/avatar.png' },
                            { id: 2, pid: 1, name: 'Aya Rahal', title: 'Sales Manager', img: './src/assets/images/defaults/avatar.png' },
                        ];
                        this.drawChart();
                    }
                }
            });
    }

    private drawChart(): void{
        this.chart = new OrgChart(this.chartContainer.nativeElement, {
            mouseScrool: OrgChart.action.ctrlZoom,
            template: 'ana',
            enableDragDrop: true,
            assistantSeparation: 170,
            nodeCircleMenu: {
                details: {
                    icon: OrgChart.icon.details(24, 24, '#aeaeae'),
                    text: 'Details',
                    color: 'white',
                },
                edit: {
                    icon: OrgChart.icon.edit(24, 24, '#aeaeae'),
                    text: 'Edit node',
                    color: 'white',
                },
                add: {
                    icon: OrgChart.icon.add(24, 24, '#aeaeae'),
                    text: 'Add node',
                    color: 'white',
                },
                remove: {
                    icon: OrgChart.icon.remove(24, 24, '#aeaeae'),
                    text: 'Remove node',
                    color: '#fff',
                },
                addLink: {
                    icon: OrgChart.icon.link(24, 24, '#aeaeae'),
                    text: 'Add C link(drag and drop)',
                    color: '#fff',
                    draggable: true,
                },
            },
            nodeMenu: {
                details: { text: 'Details' },
                edit: { text: 'Edit' },
                add: { text: 'Add' },
                remove: { text: 'Remove' },
            },
            align: OrgChart.ORIENTATION,
            toolbar: {
                fullScreen: true,
                zoom: true,
                fit: true,
                expandAll: true,
            },
            nodeBinding: {
                field_0: 'name',
                field_1: 'title',
                img_0: 'img',
            },
            tags: {
                'top-management': {
                    template: 'invisibleGroup',
                    subTreeConfig: {
                        orientation: OrgChart.orientation.bottom,
                        collapse: {
                            level: 1,
                        },
                    },
                },
                'it-team': {
                    subTreeConfig: {
                        layout: OrgChart.mixed,
                        collapse: {
                            level: 1,
                        },
                    },
                },
                'hr-team': {
                    subTreeConfig: {
                        layout: OrgChart.treeRightOffset,
                        collapse: {
                            level: 1,
                        },
                    },
                },
                'sales-team': {
                    subTreeConfig: {
                        layout: OrgChart.treeLeftOffset,
                        collapse: {
                            level: 1,
                        },
                    },
                },
                'seo-menu': {
                    nodeMenu: {
                        addSharholder: { text: 'Add new sharholder', icon: OrgChart.icon.add(24, 24, '#7A7A7A') },
                        addDepartment: { text: 'Add new department', icon: OrgChart.icon.add(24, 24, '#7A7A7A') },
                        addAssistant: { text: 'Add new assitsant', icon: OrgChart.icon.add(24, 24, '#7A7A7A') },
                        edit: { text: 'Edit' },
                        details: { text: 'Details' },
                    },
                },
                'menu-without-add': {
                    nodeMenu: {
                        details: { text: 'Details' },
                        edit: { text: 'Edit' },
                        remove: { text: 'Remove' },
                    },
                },
                'it-team-member': {
                    template: 'itTemplate',
                },
            },
            clinks: [{ from: 11, to: 18 }],
        });

        this.chart.on("added", (sender: OrgChart, id: string) => {
            console.log('added ', id, sender)
            sender.editUI.show(id);
        });

        this.chart.load(this.defaultListOrganisation);
    }

    updateOrganisation(): void{
        const requestDate: IOrganigramme = {
            id: this.isUpdate() ? this.idEntity() : undefined,
            content: JSON.stringify(this.chart.config.nodes?.map(item => {
                return {
                    ...item,
                    img: './src/assets/images/defaults/avatar.png'
                }
            }))
        }
        if( !this.isUpdate() ){
            this.store.dispatch(addOrganigramme(requestDate));
        }
        else{
            this.store.dispatch(updateOrganigramme(requestDate));
        }

    }
}

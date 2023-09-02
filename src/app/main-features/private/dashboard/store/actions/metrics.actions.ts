import { createAction, props } from '@ngrx/store';
import { IMetrics } from '../../../../../shared/models/metrics.model';

export const loadListMetrics = createAction('[ListMetrics] Load ListMetrics');

export const loadMetricsSuccess = createAction('[ListMetrics] Load ListMetrics Success', props<{ payload: IMetrics[] }>());

export const loadMetricsFailure = createAction('[ListMetrics] Load ListMetrics Failure', props<{ error: string }>());

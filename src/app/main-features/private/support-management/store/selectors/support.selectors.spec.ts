import {initSupportState, ISupportState} from "../state/support.state";
import {selectorAboutUs} from "./support.selectors";

describe('Support  Selectors', () => {
  it('should selector the AboutUs', () => {
    // Given
    const initialState: ISupportState = initSupportState;

    // When
    const resultAboutUs = selectorAboutUs.projector(initialState);

    // Then
    expect(resultAboutUs.loading).toEqual(false);
    expect(resultAboutUs.loadingEntities).toEqual(false);
    expect(resultAboutUs.entities.length).toEqual(0);
    expect(resultAboutUs.totalElements).toEqual(-1);
    expect(resultAboutUs.totalPages).toEqual(-1);
    expect(resultAboutUs.errorMessage).toEqual(null);
    expect(resultAboutUs.addSuccess).toEqual(false);
    expect(resultAboutUs.updateSuccess).toEqual(false);
  });
});

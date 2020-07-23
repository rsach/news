import { NewState, reducer } from './news.reducer';
import {
  newsLoaded,
  loadingCachedNews,
  onUpdate
} from '../actions/news.action';
import { getMockNews } from 'src/app/model/news';

describe('ApplicantsReducer', () => {
  const initialState: NewState = {
    page: 0,
    pages: [],
    data: {}
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(
        jasmine.objectContaining({
          page: 0,
          pages: [],
          data: {}
        })
      );
    });
  });

  describe('load news action', () => {
    it('should return the loading state', () => {
      const payload = getMockNews();
      const result = reducer(undefined, newsLoaded({ payload }));

      expect(result).toEqual(
        jasmine.objectContaining({
          page: 0,
          pages: [0],
          data: { 0: [...payload.hits] }
        })
      );
    });
  });

  describe('load news action', () => {
    it('should return the loading state', () => {
      const payload = getMockNews();
      const prevState = reducer(undefined, newsLoaded({ payload }));

      const result = reducer(prevState, loadingCachedNews({ page: 0 }));

      expect(result).toEqual(
        jasmine.objectContaining({
          page: 0,
          pages: [0],
          data: { 0: [...payload.hits] }
        })
      );
    });
  });

  describe('load news action', () => {
    it('should return the loading state', () => {
      const payload = getMockNews();
      const prevState = reducer(undefined, newsLoaded({ payload }));

      const result = reducer(
        prevState,
        onUpdate({ hits: prevState.data[0][0] })
      );

      expect(result).toEqual(
        jasmine.objectContaining({
          page: 0,
          pages: [0],
          data: { 0: [...payload.hits] }
        })
      );
    });
  });

  // describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
  //   type ApplicantsActions = typeof ApplicantActions.loadApplicantsSuccess;
  //   function noExistingApplicants(
  //     action: ApplicantsActions,
  //     applicantsInitialState: any,
  //     applicants: Applicant[]
  //   ) {
  //     const createAction = action({ applicants });

  //     const result = reducer(applicantsInitialState, createAction);

  //     expect(result).toEqual(
  //       jasmine.objectContaining({
  //         applicant: null,
  //         applicants: [...applicants],
  //         loaded: true,
  //         loading: false
  //       })
  //     );
  //   }

  //   function existingApplicants(
  //     action: ApplicantsActions,
  //     applicantsInitialState: any,
  //     applicants: Applicant[]
  //   ) {
  //     // should not replace existing applicants
  //     const differentApplicant2 = { ...applicants[0], name: 'bar' };
  //     const createAction = action({
  //       applicants: [applicants[1], differentApplicant2]
  //     });

  //     const result = reducer(applicantsInitialState, createAction);
  //     expect(result).toEqual(
  //       jasmine.objectContaining({
  //         applicant: null,
  //         applicants: [applicants[1], differentApplicant2],
  //         loaded: true,
  //         loading: false
  //       })
  //     );
  //   }

  //   it('should add all applicants in the payload when none exist', () => {
  //     noExistingApplicants(
  //       ApplicantActions.loadApplicantsSuccess,
  //       initialState,
  //       [applicant1, applicant2]
  //     );
  //   });

  //   it('should add only applicants when applicants already exist', () => {
  //     existingApplicants(ApplicantActions.loadApplicantsSuccess, initialState, [
  //       applicant2,
  //       applicant3
  //     ]);
  //   });
  // });

  // describe('SELECT', () => {
  //   it('should set the selected applicant id on the state', () => {
  //     const action = ApplicantActions.searchSelectedApplicant({
  //       id: applicant1.id
  //     });

  //     const result = reducer(initialState, action);

  //     expect(result).toEqual(
  //       jasmine.objectContaining({
  //         ...initialState,
  //         applicant: applicant1
  //       })
  //     );
  //   });

  //   it('id not available in state', () => {
  //     const action = ApplicantActions.searchSelectedApplicant({
  //       id: applicant1.id
  //     });
  //     const result = reducer(fromApplicant.initialState, action);

  //     expect(result).toEqual(
  //       jasmine.objectContaining({
  //         ...fromApplicant.initialState,
  //         applicant: null
  //       })
  //     );
  //   });
  // });

  // describe('Add Applicant to state', () => {
  //   it('add new applicant to state', () => {
  //     const modifiedApplicant = { ...applicant1, id: '12345' };
  //     const action = ApplicantActions.addApplicant({
  //       applicant: modifiedApplicant
  //     });

  //     const result = reducer(initialState, action);

  //     expect(result).toEqual(
  //       jasmine.objectContaining({
  //         ...initialState,
  //         applicants: [...initialState.applicants, modifiedApplicant]
  //       })
  //     );
  //   });

  //   it('add existing applicant to state', () => {
  //     const action = ApplicantActions.addApplicant({ applicant: applicant1 });

  //     const result = reducer(initialState, action);

  //     expect(result).toEqual(
  //       jasmine.objectContaining({
  //         ...initialState,
  //         applicants: [...initialState.applicants]
  //       })
  //     );
  //   });

  //   it('add new applicant to state failure', () => {
  //     const action = ApplicantActions.addApplicantFailure({
  //       applicant: applicant1
  //     });

  //     const result = reducer(initialState, action);

  //     expect(result).toEqual(
  //       jasmine.objectContaining({
  //         ...initialState,
  //         applicants: [
  //           ...initialState.applicants.filter(res => res.id !== applicant1.id)
  //         ]
  //       })
  //     );
  //   });
  // });

  // describe('Remove Applicant from state', () => {
  //   it('remove applicant from state', () => {
  //     const action = ApplicantActions.removeApplicant({
  //       applicant: applicant1
  //     });

  //     const result = reducer(initialState, action);

  //     expect(result).toEqual(
  //       jasmine.objectContaining({
  //         ...initialState,
  //         applicants: [
  //           ...initialState.applicants.filter(res => res.id !== applicant1.id)
  //         ]
  //       })
  //     );
  //   });
  // });

  // describe('Update Applicant from state', () => {
  //   it('remove applicant from state', () => {
  //     const modifiedApplicant = { ...applicant1, name: 'foo bar' };
  //     const action = ApplicantActions.updateApplicantSuccess({
  //       applicant: modifiedApplicant
  //     });

  //     const result = reducer(initialState, action);

  //     expect(result).toEqual(
  //       jasmine.objectContaining({
  //         ...initialState,
  //         applicants: [
  //           ...initialState.applicants.filter(res => res.id !== applicant1.id),
  //           modifiedApplicant
  //         ]
  //       })
  //     );
  //   });
  // });

  // describe('get state from function', () => {
  //   it('getLoaded', () => {
  //     expect(getLoaded(initialState)).toEqual(true);
  //   });

  //   it('getLoading', () => {
  //     expect(getLoading(initialState)).toEqual(false);
  //   });

  //   it('getApplicants', () => {
  //     expect(getApplicants(initialState)).toEqual(initialState.applicants);
  //   });
  // });

  // describe('Selectors', () => {
  //   describe('selectId', () => {
  //     it('should return the selected id', () => {
  //       const result = fromApplicants.selectId({
  //         ...initialState,
  //         selectedApplicantId: applicant1.id,
  //       });
  //
  //       expect(result).toMatchSnapshot();
  //     });
  //   });
  // });
});

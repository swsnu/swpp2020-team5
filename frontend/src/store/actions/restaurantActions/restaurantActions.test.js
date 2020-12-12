import axios from 'axios';
import * as actionCreators from './restaurauntActions';
import store from '../../store';
import { faItalic } from '@fortawesome/free-solid-svg-icons';

const stubRestaurantList =[
  {
    id: 1,
    title: '안녕베트남'
  },
  {
    id: 2,
    title: '요츠야텐동'
  },
]
const stubSelectedRestaurant = {
  id:1,
  title:'안녕베트남',
}


describe('restaurant actionCreators', () =>{
  afterEach(() => {
    jest.clearAllMocks();
  })
  it('getUser should process error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        reject(new Error('error'));
      }));
    store.dispatch(actionCreators.getRestaurantList()).then(() => {
      const newState = store.getState();
      done();
    });
  });  
   
  it('should get restaurant list properly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubRestaurantList
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getRestaurantList()).then(() => {
      const newState = store.getState();
      expect(newState.rs.restaurantlist).toBe(stubRestaurantList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('getUser should process error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        reject(new Error('error'));
      }));
    store.dispatch(actionCreators.getRestaurantDetail()).then(() => {
      const newState = store.getState();
      done();
    });
  });  
   
  it('should get restaurant properly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubSelectedRestaurant
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getRestaurantDetail()).then(() => {
      const newState = store.getState();
      expect(newState.rs.selectedRestaurant).toBe(stubSelectedRestaurant);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });


})
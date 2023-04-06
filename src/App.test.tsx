import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Basket from './pages/Basket/Basket';
import { Provider, useSelector } from 'react-redux';
import {store} from '../src/app/Redux/Store/Index'
import { MemoryRouter } from 'react-router-dom';
import { addBasket } from './app/Redux/Store/basket';
import { ICardApi } from './shared/api/CardApi';

const res:ICardApi[] = [{
  id: 1,
  imgURL: '',
  size: '',
  brand: '',
  code: '',
  manufacturer: '43',
  price: 432,
  name: '',
  count:1,
  description:'',
  type: ['fd','fd']
}]

  test('Empty arr', () => {
    let tree = render(<MemoryRouter><Provider store={store}><Basket /></Provider></MemoryRouter>);
    let res = screen.getByText(/Корзина пуста/i)
    expect(res).toBeInTheDocument();
  });

  beforeEach(()=>{
    addBasket([{
        id: 1,
        imgURL: '',
        size: '',
        brand: '',
        code: '',
        manufacturer: '43',
        price: 432,
        name: '',
        count:1,
        description:'',
        type: ['fd','fd']
      }])
  })

  test('With arr', () => {
    // 
    let tree = render(<MemoryRouter><Provider store={store}><Basket /></Provider></MemoryRouter>);

    expect(tree).toMatchSnapshot();
  });
import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Basket from './pages/Basket/Basket';
import { Provider, useSelector } from 'react-redux';
import {store} from '../src/app/Redux/Store/Index'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { addBasket } from './app/Redux/Store/basket';
import { CardApi, ICardApi, CardApiId, ICardData, DeleteCardApi, AddCardApi } from './shared/api/CardApi';
import Navigation from './widgets/Navigation/Navigation';
import userEvent from '@testing-library/user-event';
import Admin from './pages/AdminPanel/Admin';
import Routing from './pages';
import MyButton from './shared/UI/Buttons/MyButton/MyButton';
import Count from './shared/UI/Count/Count';
import Modal from './shared/UI/Modal/Modal';
import Loader from './shared/UI/Loader/Loader';
import CheckBox from './shared/UI/CheckBox/CheckBox';
import Toggle from './shared/UI/Toggle/Toggle';

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


describe("Test", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });



  test('Empty arr', () => {
    render(<MemoryRouter><Provider store={store}><Basket /></Provider></MemoryRouter>);
    let res = screen.getByText(/Корзина пуста/i)
    expect(res).toBeInTheDocument();
  });

  test('MyButton', async() => {
    render(
    <MyButton >Кнопка</MyButton>
    );
    let link = screen.getByText(/Кнопка/i)
    expect(link).toBeInTheDocument();
  });

  test('Modal', ()=>{

    render(<Modal visible={true}>
      <div>Модалка</div>
    </Modal>)
    let link = screen.getByText(/Модалка/i)
    expect(link).toBeInTheDocument();
  })

  test('Loader', async ()=>{
    render(<Loader/>)
    let link = await screen.findAllByTestId("loader")
    expect(link[0]).toBeInTheDocument();

  })

  test('CardApi', async ()=>{
    let res = await CardApi()
    expect(res.data).toHaveLength(19)
  })

  test('AddCardApi', async ()=>{
    let res = await AddCardApi({
      id: 31,
      imgURL: 'URLid',
      size: '321ml',
      brand: 'ds',
      code: '3213',
      manufacturer: 'dsasda',
      price: 321,
      name: 'dsa',
      count: 1,
      description: 'dsadsa',
      type: ['dsa']
    })
    expect(res.data?.imgURL).toEqual('URLid')
  })

  test('DeleteCardApi', async ()=>{
    let res = await DeleteCardApi(31)
    expect(res.data?.imgURL).toEqual('URLid')
  })

  test('CardApiId', async()=>{
    let res = await CardApiId('6')
    expect(res.data?.code).toEqual('4532543253')
  })

  test('CheckBox', ()=>{
    render(<CheckBox text="text1" count="1"/>)
    expect(screen.getByText(/text1/i)).toBeInTheDocument();
  })

  test('Toggle', async ()=>{
    render(
      <Toggle nameBtn='Кнопка'>
        <div>Tog</div>
      </Toggle>
    )
    let btn = screen.getByTestId('btn')
    fireEvent.click(btn)
    expect(screen.getByText(/Tog/i)).toBeInTheDocument();
  })
});
import { useState } from 'react';
import './App.scss';
import { Header } from './components/header/Header';
import { Notes } from './components/notes/Notes';
import { Modal } from './components/modals/Modal';

export default function App() {
  return (
    <div className="App">
      <>
        <Header />
        <Notes />
      </>
    </div>
  );
}

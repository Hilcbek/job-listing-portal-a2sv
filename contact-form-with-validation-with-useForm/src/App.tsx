import { Toaster } from 'sonner';
import ContactForm from './components/contact-form';
import HeaderComponent from './components/header';

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            width: 'fit-content',
            fontSize: 12,
          },
          closeButton: true,
        }}
      />
      <HeaderComponent />
      <ContactForm />
    </>
  );
}

export default App;

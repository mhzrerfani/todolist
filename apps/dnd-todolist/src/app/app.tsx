import Header from '../components/Header';
import Container from '../components/Container';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="w-screen h-screen flex flex-col gap-10">
      <Header />
      <Container />
    </div>
  );
};

export default App;

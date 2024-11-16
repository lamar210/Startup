import Button from 'react-bootstrap/Button';

export function NavButton({ text, url }) {
  const navigate = useNavigate();
  return (
    <Button variant='primary' onClick={() => navigate({ url })}>
      {text}
    </Button>
  );
}
import { styled } from '@stitches.js';
import Button from './common/Button';
import Container from './common/Container';
import GithubIcon from '@/assets/icons/github.svg';

function Footer() {
  return (
    <Container>
      <FlexBox>
        <p className="copywrite">&#169; 2021 &#183; JHSeo</p>
        <Button
          as="a"
          kind="grayScale"
          size="small"
          ghost
          rel="noopener noreferrer"
          href="https://github.com/JHSeo-git"
          target="_blank"
        >
          <GithubIcon className="github" />
        </Button>
      </FlexBox>
    </Container>
  );
}

const FlexBox = styled('div', {
  height: '100%',
  display: 'flex',
  jc: 'center',
  ai: 'center',

  '& .copywrite': {
    m: 0,
    p: 0,
    mr: '$2',
    fontSize: '$xs',
    color: '$mauve11',
  },

  '& .github': {
    size: '20px',
  },
});

export default Footer;

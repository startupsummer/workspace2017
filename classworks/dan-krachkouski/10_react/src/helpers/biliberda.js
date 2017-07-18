import lorem from 'lorem-ipsum';

const newIssue = () => ({
  title: lorem(),
  body: lorem({ count: 5 })
});

export default newIssue;

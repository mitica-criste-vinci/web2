
type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{title}</h1>
    </header>
  );
};

export default PageTitle;

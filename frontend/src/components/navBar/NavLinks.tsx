type Props = {
  linkName: string;
  //   linkSelected: boolean;
};

const NavLinks = ({ linkName }: Props) => {
  return (
    <div>
      <span className="lg:text-lg text-sm">{linkName}</span>
    </div>
  );
};

export default NavLinks;

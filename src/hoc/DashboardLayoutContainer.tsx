type Props = {
  children?: React.ReactNode;
};
export const DashboardLayoutContainer = ({ children }: Props) => {
  return (
    <div className="col-sm-12 mt-3 mb-3 g-3 blockrpdVerified">{children}</div>
  );
};

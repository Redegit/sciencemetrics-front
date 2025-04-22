import { EchartsWordCloud } from "../../components/EchartsWordCloud";
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";

export const WORDCLOUD = () => {
  return (
    <>
      <div className="filters">Фильтры</div>

      <DashboardLayoutContainer>
        <EchartsWordCloud />
      </DashboardLayoutContainer>
    </>
  );
};

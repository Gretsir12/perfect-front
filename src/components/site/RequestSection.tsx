import { LeadForm } from "./LeadForm";

export function RequestSection() {
  return <section className="request-section" id="request"><div className="content-width request-grid"><div><p className="section-kicker">Для заказа</p><h2>Отправить заявку</h2><p>Здесь Вы можете оставить свою заявку на проект или замер, а также вопросы связанные с уточнением деталей для заказа</p></div><LeadForm showConsent={false} /></div></section>;
}

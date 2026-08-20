const steps = [
  ["01", "Заявка и расчет", "Проконсультируем и сделаем предварительный расчет"],
  ["02", "Согласование и замер", "Учтем пожелания и совместим с техническими возможностями, сделаем замер"],
  ["03", "Изготовление", "Изготовим изделие в точности по сделанным замерам из материалов высокого качества"],
  ["04", "Доставка и монтаж", "Доставим специальным транспортом, монтаж выполнят квалифицированные специалисты"],
];

export function ProcessSteps() {
  return <section className="legacy-process"><div className="content-width"><p className="section-kicker">Всё очень просто</p><h2>Полный цикл производства</h2><div className="process-grid">{steps.map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import StackedSection from '@/components/ui/StackedSection';
import { useLocale, t, localeHref } from '@/lib/i18n';

export default function AboutPageClient() {
  const lang = useLocale();
  const c = {
    eyebrow: { en: "The operators’ agency · Marrakech", fr: "L’agence des opérateurs · Marrakech" },
    h1a: { en: "Outcomes,", fr: "Des résultats," },
    h1b: { en: "not deliverables.", fr: "pas des livrables." },
    leadA: {
      en: 'BidayaLab is a senior-only studio for AI automation, web engineering and brand systems. Every engagement ships with a measured outcome attached — not a deliverable list.',
      fr: "BidayaLab est un studio 100 % senior pour l’automatisation IA, l’ingénierie web et les systèmes de marque. Chaque mission est livrée avec un résultat mesuré — pas une liste de livrables.",
    },
    leadB: {
      en: "We work with founders who care less about a deck and more about a number. If we don’t hit the agreed metric, we rebuild on our time. It’s in the contract.",
      fr: "On travaille avec des fondateurs qui se fichent du deck et qui veulent un chiffre. Si on n’atteint pas la métrique convenue, on refait sur notre temps. C’est écrit dans le contrat.",
    },
    whyTitle: { en: 'Why we exist', fr: "Pourquoi on existe" },
    whyLead: {
      en: 'Because most agencies sell hours. We sell outcomes — and put the guarantee in writing.',
      fr: "Parce que la plupart des agences vendent des heures. Nous, on vend des résultats — et on met la garantie par écrit.",
    },
    pasProblemLabel: { en: 'The problem.', fr: 'Le problème.' },
    pasProblemBody: {
      en: "Founders pay for “digital transformation” and get a slide deck. They pay for a website and get a brochure that doesn’t convert. They pay for “AI” and get a chatbot that nobody uses. The deliverable shows up. The number doesn’t move.",
      fr: "Les fondateurs paient pour de la « transformation digitale » et reçoivent un deck. Ils paient pour un site et reçoivent une brochure qui ne convertit pas. Ils paient pour « l’IA » et reçoivent un chatbot que personne n’utilise. Le livrable arrive. Le chiffre ne bouge pas.",
    },
    pasCostLabel: { en: 'The cost.', fr: 'Le coût.' },
    pasCostBody: {
      en: 'Every quarter you wait, your competitor automates one more workflow and shaves another point off CAC. Every WordPress site that loads in 4 seconds is silently bleeding 30–60% of mobile traffic before the page even paints.',
      fr: 'Chaque trimestre d’attente, votre concurrent automatise un workflow de plus et gratte un point de CAC. Chaque WordPress qui charge en 4 secondes perd silencieusement 30–60 % du trafic mobile avant même d’afficher la page.',
    },
    pasAnswerLabel: { en: 'Our answer.', fr: 'Notre réponse.' },
    pasAnswerBody: {
      en: "A small senior team. A written outcome before kickoff. A measured baseline at week 1, a result snapshot at handover, and a 30-day tuning window after launch. If the number isn’t there, neither is the invoice.",
      fr: "Une petite équipe senior. Un résultat écrit avant le coup d’envoi. Une mesure baseline en semaine 1, un snapshot résultats à la livraison, et une fenêtre de réglage de 30 jours après lancement. Si le chiffre n’y est pas, la facture non plus.",
    },
    guarantee: { en: 'Measured or reworked', fr: 'Mesuré ou refait' },
    guaranteeBody: {
      en: "Every project ships with a metric attached — conversion lift, hours saved, revenue per visitor. If we don’t hit it within 30 days of handover, we keep working until we do, on our time.",
      fr: "Chaque projet est livré avec une métrique attachée — lift de conversion, heures économisées, revenus par visiteur. Si on ne l’atteint pas dans les 30 jours après livraison, on continue jusqu’à ce qu’elle soit atteinte, sur notre temps.",
    },
    methodTitle: { en: 'The measured method', fr: 'La méthode mesurée' },
    methodLead: {
      en: 'Three steps. Every one ends in a number you can put on a slide.',
      fr: 'Trois étapes. Chacune se termine par un chiffre que vous pouvez mettre dans un deck.',
    },
    step1t: { en: 'Audit & baseline', fr: 'Audit & baseline' },
    step1d: {
      en: 'A senior operator pulls apart your funnel, ops or brand. We measure the current state — conversion, hours per task, time-to-launch — and write the target number into the proposal. 30 minutes, free.',
      fr: "Un opérateur senior découpe votre tunnel, vos opérations ou votre marque. On mesure l’état actuel — conversion, heures par tâche, time-to-launch — et on écrit le chiffre cible dans la proposition. 30 minutes, offertes.",
    },
    step2t: { en: 'Build & ship', fr: 'Build & livraison' },
    step2d: {
      en: "Senior-only delivery. n8n / GPT for ops, Next.js or Shopify Hydrogen for web, in-house brand & motion. Weekly demo, no “status update” theater. You see the system run before you sign off.",
      fr: "Livraison 100 % senior. n8n / GPT pour les ops, Next.js ou Shopify Hydrogen pour le web, marque & motion en interne. Demo hebdo, pas de théâtre de « status update ». Vous voyez le système tourner avant de valider.",
    },
    step3t: { en: 'Measure & rework', fr: 'Mesure & itération' },
    step3d: {
      en: "30-day tuning window after handover. We watch the metric, iterate, and keep going until the number lands. If it doesn’t, we rebuild on our time. The guarantee is in the contract, not in the marketing.",
      fr: "Fenêtre de réglage de 30 jours après livraison. On surveille la métrique, on itère, on continue jusqu’à ce que le chiffre tombe. S’il ne tombe pas, on refait sur notre temps. La garantie est dans le contrat, pas dans le marketing.",
    },
    proofTitleA: { en: 'Proof in', fr: 'Preuves' },
    proofTitleB: { en: 'numbers', fr: 'chiffrées' },
    proofLead: {
      en: "We don’t do testimonial walls. We do measured outcomes — pulled straight from client analytics, not invented for the website.",
      fr: "On ne fait pas de mur de témoignages. On fait des résultats mesurés — tirés directement des analytics client, pas inventés pour le site.",
    },
    proofCta: { en: 'See full case studies', fr: 'Voir toutes les études de cas' },
    teamTitle: { en: 'Operators, not consultants', fr: 'Des opérateurs, pas des consultants' },
    teamLead: {
      en: "Senior-only delivery. The person on your audit call is the person on your build — no juniors learning on your budget, no agency middle-layer translating between you and the work.",
      fr: "Livraison 100 % senior. La personne à votre appel audit est la même qui construit — pas de junior qui apprend sur votre budget, pas de couche intermédiaire qui traduit entre vous et le travail.",
    },
    capCount: { en: 'Active projects this quarter', fr: 'Projets actifs ce trimestre' },
    capNote: { en: 'Intentionally capped — the guarantee depends on it.', fr: 'Volontairement limité — la garantie en dépend.' },
    quote: {
      en: "We don’t hire generalists. We hire «opL» who’ve shipped, scaled and seen what breaks at the next stage.",
      fr: "On n’embauche pas des généralistes. On embauche des «opL» qui ont déjà livré, scalé et vu ce qui casse à l’étape suivante.",
    },
    disciplinesLabel: { en: 'In-house disciplines', fr: 'Disciplines internes' },
    ctaScarcity: { en: 'Free 30-min audit · 3 slots open this quarter', fr: 'Audit 30 min offert · 3 places ce trimestre' },
    ctaTitleA: { en: 'Stop guessing.', fr: "Arrêtez de deviner." },
    ctaTitleB: { en: 'Get the number.', fr: 'Obtenez le chiffre.' },
    ctaLead: {
      en: "30 minutes with a senior operator. We pull apart your funnel and you leave with a written highest-leverage fix — even if you never hire us.",
      fr: "30 minutes avec un opérateur senior. On découpe votre tunnel et vous repartez avec un correctif à plus fort levier écrit — même si vous ne nous engagez jamais.",
    },
    ctaPrimary: { en: 'Book my audit', fr: 'Réserver mon audit' },
    ctaOrLabel: { en: 'Or write directly', fr: 'Ou écrivez directement' },
  } as const;
  const stats = lang === 'fr'
    ? [
        { label: 'Lift de conversion moyen', val: '+218 % (refontes Shopify)' },
        { label: 'Opérations automatisées', val: '−94 % d’heures manuelles / mois' },
        { label: 'Engagement films de lancement', val: '×3,4 vs baseline industrie' },
        { label: 'Marchés actifs', val: 'Maroc · France · EAU · KSA · É-U' },
        { label: 'Langues livrées', val: 'FR · AR · EN · DE sur demande' },
      ]
    : [
        { label: 'Average conversion lift', val: '+218% (Shopify rebuilds)' },
        { label: 'Ops automated', val: '−94% manual hours / month' },
        { label: 'Engagement on launch films', val: '×3.4 vs. industry baseline' },
        { label: 'Active markets', val: 'Morocco · France · UAE · KSA · US' },
        { label: 'Languages delivered', val: 'FR · AR · EN · DE on request' },
      ];
  const skills = ['n8n & Make automation', 'GPT agents', 'Next.js engineering', 'Shopify Hydrogen', 'Conversion design', 'Brand systems', 'Motion & product film', 'CWV · SEO'];
  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#beff01] selection:text-black font-louis">
      <main className="relative w-full overflow-hidden">

        {/* 1. HERO — Marketing angle: operators, not consultants */}
        <StackedSection index={0}>
          <section className="relative min-h-[60vh] flex flex-col justify-end pb-20 pt-40 px-4 md:px-8 xl:px-12 bg-[#050505]">
            <div className="max-w-[1920px] w-full mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl"
              >
                <div className="mb-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#beff01] font-bold">
                    {t(lang, c.eyebrow)}
                  </span>
                </div>

                <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase text-white mb-10">
                  {t(lang, c.h1a)}<br />
                  <span className="text-zinc-600">{t(lang, c.h1b)}</span>
                </h1>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
                    {t(lang, c.leadA)}
                  </p>
                  <div className="border-l border-white/20 pl-6 md:pl-8 py-2">
                    <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed">
                      {t(lang, c.leadB)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </StackedSection>

        {/* 2. WHY WE EXIST — PAS framing */}
        <StackedSection index={1}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-white text-black"
          >
            <div className="max-w-[1920px] mx-auto grid md:grid-cols-12 gap-12 lg:gap-20">

              <div className="md:col-span-5 relative">
                <div className="sticky top-32">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                    {t(lang, c.whyTitle)}
                  </h2>
                  <div className="w-16 h-[2px] bg-black/20 mb-8" />
                  <p className="text-xl text-zinc-500 font-light max-w-sm">
                    {t(lang, c.whyLead)}
                  </p>
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col gap-10">
                <div className="text-xl md:text-2xl text-zinc-700 font-light leading-relaxed flex flex-col gap-8">
                  <p>
                    <strong className="text-black font-bold">{t(lang, c.pasProblemLabel)}</strong> {t(lang, c.pasProblemBody)}
                  </p>
                  <p>
                    <strong className="text-black font-bold">{t(lang, c.pasCostLabel)}</strong> {t(lang, c.pasCostBody)}
                  </p>
                  <p>
                    <strong className="text-black font-bold">{t(lang, c.pasAnswerLabel)}</strong> {t(lang, c.pasAnswerBody)}
                  </p>
                </div>

                <div className="mt-8 p-10 md:p-14 border border-black/10 bg-zinc-50 flex flex-col items-start justify-center hover:border-black/30 transition-colors">
                  <span className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-none mb-6">100%</span>
                  <span className="text-xl font-bold uppercase tracking-wider mb-4">{t(lang, c.guarantee)}</span>
                  <span className="text-zinc-600 text-lg font-light leading-relaxed max-w-xl">
                    {t(lang, c.guaranteeBody)}
                  </span>
                </div>
              </div>

            </div>
          </motion.section>
        </StackedSection>

        {/* 3. THE METHOD — 3-step measured process */}
        <StackedSection index={2}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-[#050505] border-t border-white/10"
          >
            <div className="max-w-[1920px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 text-white">
                    {t(lang, c.methodTitle)}
                  </h2>
                  <p className="text-xl text-zinc-400 max-w-xl font-light">
                    {t(lang, c.methodLead)}
                  </p>
                </div>
              </div>

              <ul className="grid lg:grid-cols-3 gap-6 list-none p-0">
                {[
                  { num: '01', title: t(lang, c.step1t), desc: t(lang, c.step1d) },
                  { num: '02', title: t(lang, c.step2t), desc: t(lang, c.step2d) },
                  { num: '03', title: t(lang, c.step3t), desc: t(lang, c.step3d) },
                ].map((s, i) => (
                  <motion.li
                    key={s.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group flex flex-col justify-between min-h-[360px] p-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#beff01]/50 transition-colors duration-300"
                  >
                    <span className="text-2xl font-black text-white/20 group-hover:text-[#beff01] transition-colors mb-8" aria-hidden="true">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">{s.title}</h3>
                      <p className="text-zinc-400 leading-relaxed font-light">
                        {s.desc}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>
        </StackedSection>

        {/* 4. PROOF IN NUMBERS — social proof aggregate */}
        <StackedSection index={3}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-white text-black border-t border-black/10"
          >
            <div className="max-w-[1920px] mx-auto grid md:grid-cols-12 gap-12 lg:gap-20 items-start">
              <div className="md:col-span-5">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                  {t(lang, c.proofTitleA)}<br />{t(lang, c.proofTitleB)}
                </h2>
                <p className="text-xl text-zinc-600 font-light leading-relaxed mb-8">
                  {t(lang, c.proofLead)}
                </p>
                <Link href={localeHref(lang, '/works')} className="inline-block border border-black px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-[#beff01] transition-colors">
                  {t(lang, c.proofCta)}
                </Link>
              </div>

              <dl className="md:col-span-7 border-t border-black/10">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-black/10 group hover:bg-zinc-50 transition-colors px-4 -mx-4">
                    <dt className="text-sm uppercase tracking-widest font-bold text-zinc-400 mb-2 md:mb-0 group-hover:text-black transition-colors">{stat.label}</dt>
                    <dd className="text-xl font-medium text-black m-0">{stat.val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.section>
        </StackedSection>

        {/* 5. THE TEAM — Operators, not consultants */}
        <StackedSection index={4}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-[#050505] border-t border-white/10"
          >
            <div className="max-w-[1920px] mx-auto">
              <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
                  {t(lang, c.teamTitle)}
                </h2>
                <p className="text-xl text-zinc-400 font-light max-w-2xl">
                  {t(lang, c.teamLead)}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="border border-white/10 p-10 bg-[#beff01] text-black hover:bg-white transition-colors flex flex-col justify-end min-h-[300px]">
                  <p className="text-7xl font-black tracking-tighter mb-2">3</p>
                  <p className="text-sm font-bold uppercase tracking-widest">{t(lang, c.capCount)}</p>
                  <p className="text-sm font-medium mt-3 opacity-70">{t(lang, c.capNote)}</p>
                </div>

                <div className="border border-white/10 p-10 bg-white/[0.02] flex items-center min-h-[300px] lg:col-span-2 hover:bg-white/[0.05] transition-colors">
                  <h3 className="text-2xl md:text-4xl font-light text-white leading-snug">
                    {lang === 'fr' ? (
                      <>«On n’embauche pas des généralistes. On embauche des <strong className="font-bold text-[#beff01]">opérateurs</strong> qui ont déjà livré, scalé et vu ce qui casse à l’étape suivante.»</>
                    ) : (
                      <>&ldquo;We don&apos;t hire generalists. We hire <strong className="font-bold text-[#beff01]">operators</strong> who&apos;ve shipped, scaled and seen what breaks at the next stage.&rdquo;</>
                    )}
                  </h3>
                </div>

                <div className="border border-white/10 p-10 bg-white/[0.02] lg:col-span-3 min-h-[250px] flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 mb-6 block">{t(lang, c.disciplinesLabel)}</span>
                  <div className="flex flex-wrap gap-4">
                    {skills.map((skill) => (
                      <span key={skill} className="px-5 py-3 text-sm font-bold uppercase tracking-widest border border-white/10 text-white hover:bg-[#beff01] hover:text-black hover:border-[#beff01] transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.section>
        </StackedSection>

        {/* 6. CTA — high-conversion close */}
        <StackedSection index={5}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-white text-black border-t border-black/10"
          >
            <div className="max-w-[1920px] mx-auto text-center">
              <span className="text-[#beff01] bg-black px-4 py-1 text-xs uppercase tracking-[0.2em] font-bold mb-8 inline-block">
                {t(lang, c.ctaScarcity)}
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[8vw] font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                {t(lang, c.ctaTitleA)}<br />{t(lang, c.ctaTitleB)}
              </h2>
              <p className="text-lg md:text-xl text-zinc-600 font-light max-w-2xl mx-auto mb-12">
                {t(lang, c.ctaLead)}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
                <Link href={localeHref(lang, '/contact')} className="w-full md:w-auto inline-flex items-center justify-center bg-black text-white px-12 py-5 text-sm font-bold uppercase tracking-widest border border-black hover:bg-[#beff01] hover:text-black hover:border-[#beff01] transition-colors">
                  {t(lang, c.ctaPrimary)}
                </Link>
                <div className="text-left w-full md:w-auto">
                   <p className="text-sm uppercase tracking-widest font-bold text-zinc-500 mb-1 block">{t(lang, c.ctaOrLabel)}</p>
                   <a href="mailto:hello@bidayalab.com" className="text-xl font-bold text-black hover:text-zinc-600 transition-colors border-b border-black">hello@bidayalab.com</a>
                </div>
              </div>
            </div>
          </motion.section>
        </StackedSection>

      </main>
    </div>
  );
}

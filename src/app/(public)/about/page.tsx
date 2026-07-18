import Image from "next/image";
import { Target, Heart, Users, Rocket } from "lucide-react";

const values = [
  { icon: Target, title: "Outcomes over hours", body: "We measure success by skills gained, not video minutes watched." },
  { icon: Heart, title: "Made for learners", body: "Every feature is designed around what keeps people coming back to finish." },
  { icon: Users, title: "Publisher-first", body: "We build tools that make it easy for real practitioners to teach well." },
  { icon: Rocket, title: "Ship quickly", body: "Small, well-crafted improvements, shipped constantly." },
];

const stats = [
  { label: "Active learners", value: "240K+" },
  { label: "Courses published", value: "1,200+" },
  { label: "Countries reached", value: "80+" },
  { label: "Certificates issued", value: "95K+" },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-background-secondary py-20">
        <div className="container-page max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-bold text-text sm:text-5xl">
            We're building the place people actually finish learning.
          </h1>
          <p className="mt-5 text-lg text-text-secondary">
            Courverse started with a simple observation: most learners never finish their courses. So we built a platform around progress, rewards, and real accountability.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
              alt="Team collaborating"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">Our story</h2>
            <p className="mt-4 text-text-secondary">
              We were engineers, designers, and educators who kept abandoning our own online courses halfway through. The content wasn't the problem — the experience was.
            </p>
            <p className="mt-4 text-text-secondary">
              So we set out to build a learning platform with the polish of the best software products we use every day, paired with gamification that actually respects your time instead of gimmicks that waste it.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background-secondary py-16">
        <div className="container-page grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-center font-heading text-2xl font-bold text-text sm:text-3xl">What we believe</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="card-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading font-semibold text-text">{v.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

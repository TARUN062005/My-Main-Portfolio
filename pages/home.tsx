import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="mb-4">I am a Full Stack Developer & UI/UX Enthusiast.</p>
      <div className="flex space-x-4">
        <Link href="/work">
          <a className="btn btn-secondary">View Work</a>
        </Link>
        <a href="/resume.pdf" download="My-Resume.pdf" className="btn btn-primary">
          Resume
        </a>
        <Link href="/contact">
          <a className="btn btn-secondary">Contact</a>
        </Link>
      </div>
    </div>
  );
}
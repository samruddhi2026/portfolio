import Image from "next/image";
import { ExternalLink, GitFork, Star } from "lucide-react";
import SectionHeading, { SectionWrapper } from "@/components/ui/SectionHeading";
import { fetchGitHubRepos, fetchGitHubUser, GITHUB_USERNAME } from "@/lib/github";

export default async function GitHubSection() {
  const [user, repos] = await Promise.all([fetchGitHubUser(), fetchGitHubRepos()]);

  return (
    <SectionWrapper id="github" className="section-alt">
      <SectionHeading
        title="GitHub Portfolio"
        subtitle={`Open source contributions and projects by @${GITHUB_USERNAME}`}
      />

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="rounded-2xl card p-6 overflow-hidden hover:shadow-card-hover transition-shadow duration-300">
          <h3 className="font-heading font-bold text-foreground text-lg mb-4">Contribution Graph</h3>
          <div className="overflow-x-auto">
            <Image
              src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
              alt="GitHub Contribution Graph"
              width={700}
              height={120}
              className="w-full h-auto rounded-lg"
              unoptimized
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl card p-4 overflow-hidden hover:shadow-card-hover transition-shadow duration-300">
            <h3 className="font-heading font-bold text-foreground text-sm mb-3">GitHub Stats</h3>
            <Image
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=default&hide_border=true&bg_color=FFFFFF&title_color=2563EB&text_color=334155&icon_color=06B6D4`}
              alt="GitHub Stats"
              width={400}
              height={200}
              className="w-full h-auto"
              unoptimized
            />
          </div>
          <div className="rounded-2xl card p-4 overflow-hidden hover:shadow-card-hover transition-shadow duration-300">
            <h3 className="font-heading font-bold text-foreground text-sm mb-3">Most Used Languages</h3>
            <Image
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=default&hide_border=true&bg_color=FFFFFF&title_color=2563EB&text_color=334155`}
              alt="Most Used Languages"
              width={400}
              height={200}
              className="w-full h-auto"
              unoptimized
            />
          </div>
        </div>
      </div>

      {user && (
        <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl card hover:shadow-card transition-shadow duration-300">
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={48}
            height={48}
            className="rounded-full ring-2 ring-primary/20"
          />
          <div>
            <p className="text-foreground font-semibold">{user.name || user.login}</p>
            <p className="text-muted text-sm">
              {user.public_repos} repositories · {user.followers} followers
            </p>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-2 px-4 py-2 btn-outline !px-4 !py-2 text-sm"
            data-cursor="pointer"
          >
            <ExternalLink className="w-4 h-4" />
            View Profile
          </a>
        </div>
      )}

      {repos.length > 0 && (
        <div>
          <h3 className="font-heading font-bold text-foreground text-lg mb-6">Recent Repositories</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl card card-shine hover:-translate-y-2 hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
                data-cursor="pointer"
              >
                <h4 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {repo.name}
                </h4>
                <p className="text-muted text-sm line-clamp-2 mb-4 font-body">
                  {repo.description || "No description available"}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

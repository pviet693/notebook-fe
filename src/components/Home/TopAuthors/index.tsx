import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTopAuthorsQuery } from "@/hooks/user/useTopAuthorsQuery.ts";
import { Link } from "@tanstack/react-router";
import { social_icons, socials } from "@/constants";

export default function TopAuthors() {
    const { data: topAuthorsData, isLoading, isSuccess } = useTopAuthorsQuery();
    const topAuthors = topAuthorsData?.data ?? [];

    return (
        <div className="flex flex-col gap-11">
            <h2 className="text-xl font-semibold flex items-center gap-1">
                <span className="text-primary-foreground bg-primary">Top</span>
                <span> Authors</span>
            </h2>
            <div className="flex flex-col gap-10">
                {isLoading || !isSuccess
                    ? Array(3)
                          .fill(0)
                          .map((_, index) => (
                              <div
                                  key={index}
                                  className="flex items-center gap-6"
                              >
                                  <Skeleton className="w-[80px] h-[80px] rounded-full" />
                                  <div className="flex flex-col gap-3">
                                      <Skeleton className="h-5 w-32" />
                                      <Skeleton className="h-3 w-48" />
                                      <div className="flex gap-[10px]">
                                          <Skeleton className="w-[20px] h-[20px]" />
                                          <Skeleton className="w-[20px] h-[20px]" />
                                          <Skeleton className="w-[20px] h-[20px]" />
                                      </div>
                                  </div>
                              </div>
                          ))
                    : topAuthors.map((author, index) => (
                          <div key={index} className="flex items-center gap-6">
                              <Avatar className="w-[70px] h-[70px]">
                                  <AvatarImage
                                      src={author.profile_img}
                                      alt={author.fullname}
                                  />
                                  <AvatarFallback>
                                      {author.fullname[0]}
                                  </AvatarFallback>
                              </Avatar>

                              <div className="flex flex-col">
                                  <Link
                                      to="/authors/$username"
                                      params={{ username: author.username }}
                                  >
                                      <p className="text-lg text-[#222] font-semibold hover:underline">
                                          {author.fullname}
                                      </p>
                                  </Link>
                                  <p className="text-sm leading-[1.125rem] text-[#666] font-[300]">
                                      @{author.username}
                                  </p>
                                  <div className="flex gap-3.5 mt-3">
                                      {socials.map((social) => {
                                          const Icon = social_icons[social];

                                          if (!author[social]) return null;

                                          return (
                                              <a
                                                  key={social}
                                                  href={author[social]}
                                                  className="p-0.5 w-[20px] h-[20px] rounded-[3px] border border-[#c4c4c4] text-[#c4c4c4] hover:bg-[#00aaa1] hover:text-white hover:border-none hover:cursor-pointer shadow-sm"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                              >
                                                  <Icon className="w-full h-full" />
                                              </a>
                                          );
                                      })}
                                  </div>
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
}

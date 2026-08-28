<script lang="ts">
  import type { Types } from "@sv0/components/navigation/menus/menu";
  import { NavigationMenu } from "@sv0/components/navigation/menus/menu";

  const navigationData: Types.NavigationMenuProps = {
    brand: {
      href: "https://www.shadcnblocks.com",
      logo: "/images/block/logos/shadcnblockscom-icon.svg",
      name: "Shadcnblocks.com"
    },
    items: [
      {
        label: "Solutions",
        dropdown: {
          featured: {
            title: "Solutions",
            description:
              "Streamline collaboration, automate workflows, and boost productivity across your organization.",
            href: "#",
            image: "/images/block/placeholder-1.svg"
          },
          sections: [
            {
              title: "Developer Platform",
              description: "Build and deploy with confidence",
              items: [
                {
                  label: "Integration Platform",
                  href: "#",
                  icon: "puzzle"
                },
                {
                  label: "Enterprise Security",
                  href: "#",
                  icon: "lock"
                },
                {
                  label: "Developer API",
                  href: "#",
                  icon: "code"
                }
              ]
            }
          ]
        }
      },
      {
        label: "Products",
        dropdown: {
          sections: [
            {
              title: "Team Management",
              description: "Streamline team collaboration and project workflows.",
              items: [
                {
                  label: "Task Management",
                  href: "#",
                  icon: "file"
                },
                {
                  label: "Team Planning",
                  href: "#",
                  icon: "building"
                },
                {
                  label: "Resource Allocation",
                  href: "#",
                  icon: "search"
                },
                {
                  label: "Time Tracking",
                  href: "#",
                  icon: "file"
                },
                {
                  label: "Team Analytics",
                  href: "#",
                  icon: "user-plus"
                }
              ]
            },
            {
              title: "Project Management",
              description: "Plan, track, and deliver projects with confidence.",
              items: [
                {
                  label: "Project Templates",
                  href: "#",
                  icon: "circle-check"
                },
                {
                  label: "Timeline Views",
                  href: "#",
                  icon: "user-round"
                },
                {
                  label: "Risk Management",
                  href: "#",
                  icon: "shield-check"
                },
                {
                  label: "Budget Tracking",
                  href: "#",
                  icon: "scale"
                },
                {
                  label: "Global Teams",
                  href: "#",
                  icon: "globe"
                }
              ]
            },
            {
              title: "Workflow Automation",
              description: "Automate repetitive tasks and focus on what matters.",
              items: [
                {
                  label: "Custom Workflows",
                  href: "#",
                  icon: "earth"
                },
                {
                  label: "Process Templates",
                  href: "#",
                  icon: "clock"
                },
                {
                  label: "Business Rules",
                  href: "#",
                  icon: "dollar-sign"
                },
                {
                  label: "Integrations",
                  href: "#",
                  icon: "phone"
                },
                {
                  label: "API Access",
                  href: "#",
                  icon: "speech"
                }
              ]
            },
            {
              title: "Enterprise Solutions",
              description: "Scale your organization with enterprise-grade features.",
              items: [
                {
                  label: "Advanced Analytics",
                  href: "#",
                  icon: "chart-pie"
                },
                {
                  label: "Security Controls",
                  href: "#",
                  icon: "calculator"
                },
                {
                  label: "Custom Reporting",
                  href: "#",
                  icon: "table"
                }
              ]
            }
          ]
        }
      },
      {
        label: "Company",
        dropdown: {
          sections: [
            {
              title: "About Us",
              description: "Learn more about our company and mission",
              items: [
                {
                  label: "Our Story",
                  href: "#"
                },
                {
                  label: "Leadership Team",
                  href: "#"
                },
                {
                  label: "Careers",
                  href: "#"
                }
              ]
            }
          ]
        }
      },
      {
        label: "Partners",
        dropdown: {
          sections: [
            {
              title: "Partner Programs",
              description: "Join our partner ecosystem",
              items: [
                {
                  label: "Technology Partners",
                  href: "#"
                },
                {
                  label: "Consulting Partners",
                  href: "#"
                },
                {
                  label: "Reseller Program",
                  href: "#"
                }
              ]
            }
          ]
        }
      },
      {
        label: "Resources",
        dropdown: {
          sections: [
            {
              title: "Learn & Support",
              description: "Get the help you need to succeed",
              items: [
                {
                  label: "Documentation",
                  href: "#"
                },
                {
                  label: "API Reference",
                  href: "#"
                },
                {
                  label: "Community",
                  href: "#"
                },
                {
                  label: "Support Center",
                  href: "#"
                }
              ]
            }
          ]
        }
      }
    ],
    showLogin: true,
    loginHref: "#",
    loginText: "Login",
    mobileMenuLabel: "Main Menu"
  };
</script>

<div class="w-full">
  <NavigationMenu.Root {...navigationData} />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>

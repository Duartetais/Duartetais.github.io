
(() => {
    "use strict";

    const translations = {
        pt: {
            "nav.about": "sobre",
            "nav.stack": "stack",
            "nav.projects": "projetos",
            "nav.contact": "contato",
            "status": "disponível",

            "hero.tag": "// Desenvolvedora Backend",
            "hero.subtitle": "Engenheira de Software com foco em infraestrutura de redes.",
            "hero.projects": "Ver projetos",
            "hero.contact": "Contato",

            "terminal.whoami": "Engenheira de Software",
            "terminal.stack": "NestJS · TypeScript · Python",
            "terminal.network": "Linux · Cisco · Wireshark",
            "terminal.status": "aberta a novos desafios",

            "stats.apis": "Desenvolvimento de APIs REST",
            "stats.backend": "Bancos de dados relacionais e NoSQL",
            "stats.network": "Redes e topologias",
            "stats.servers": "Servidores, Apache e computação em nuvem",

            "about.title": "Sobre mim",
            "about.p1": "Estudante do último ano de Engenharia de Software, com formação complementar em Redes de Computadores. No desenvolvimento, atuo com TypeScript, JavaScript e Python, construindo e publicando APIs com NestJS, TypeORM, JWT e Swagger.",
            "about.p2": "Na infraestrutura, administro servidores Linux e Apache, monto topologias com equipamentos Cisco, analiso tráfego com Wireshark e configuro DNS, DHCP, VLAN, VPN e Firewall. Formada pela Generation Brasil.",

            "stack.title": "Tecnologias",
            "stack.development": "// desenvolvimento",
            "stack.network": "// redes & infraestrutura",
            "stack.topology": "// topologia: do backbone às máquinas",

            "projects.title": "Destaques em Backend & Design de APIs",
            "project.blog.description": "API completa para gerenciamento de conteúdo, com autenticação e temas. Documentação interativa no link de Deploy.",
            "project.game.description": "E-commerce escalável para games, com foco em arquitetura e validação rigorosa de dados.",
            "project.pharmacy.description": "Gestão farmacêutica por categorias de medicamentos, priorizando desempenho e integridade dos dados.",

            "contact.title": "Vamos conversar?",
            "contact.subtitle": "Aberta a oportunidades e novos desafios.",

            "footer.version": "portfólio v4"
        },

        en: {
            "nav.about": "about",
            "nav.stack": "stack",
            "nav.projects": "projects",
            "nav.contact": "contact",
            "status": "available",

            "hero.tag": "// Backend Developer",
            "hero.subtitle": "Software Engineering student focused on network infrastructure.",
            "hero.projects": "View projects",
            "hero.contact": "Contact",

            "terminal.whoami": "Software Engineering student",
            "terminal.stack": "NestJS · TypeScript · Python",
            "terminal.network": "Linux · Cisco · Wireshark",
            "terminal.status": "open to new challenges",

            "stats.apis": "REST API development",
            "stats.backend": "Relational and NoSQL databases",
            "stats.network": "Networks and topologies",
            "stats.servers": "Servers, Apache and cloud computing",

            "about.title": "About me",
            "about.p1": "Final-year Software Engineering student with additional training in Computer Networks. I work with TypeScript, JavaScript and Python, building and publishing APIs with NestJS, TypeORM, JWT and Swagger.",
            "about.p2": "In infrastructure, I work with Linux servers and Apache, build network topologies with Cisco equipment, analyze traffic with Wireshark, and configure DNS, DHCP, VLANs, VPNs and firewalls. Trained by Generation Brasil.",

            "stack.title": "Technologies",
            "stack.development": "// development",
            "stack.network": "// networks & infrastructure",
            "stack.topology": "// topology: from backbone to workstations",

            "projects.title": "Backend & API Design Highlights",
            "project.blog.description": "Complete content management API with authentication and themes. Interactive documentation is available through the deployment link.",
            "project.game.description": "Scalable game e-commerce API focused on architecture and rigorous data validation.",
            "project.pharmacy.description": "Pharmacy management API organized by medication categories, prioritizing performance and data integrity.",

            "contact.title": "Let's talk?",
            "contact.subtitle": "Open to new opportunities and challenges.",

            "footer.version": "portfolio v4"
        }
    };

    const storageKey = "portfolio-language";

    function getSavedLanguage() {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved === "en" || saved === "pt" ? saved : "pt";
        } catch {
            return "pt";
        }
    }

    function translatePage(language) {
        const selectedLanguage = translations[language] ? language : "pt";

        document.documentElement.lang =
            selectedLanguage === "en" ? "en" : "pt-BR";

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            const translatedText = translations[selectedLanguage][key];

            if (translatedText !== undefined) {
                element.textContent = translatedText;
            }
        });

        document.querySelectorAll("[data-language]").forEach((button) => {
            const isSelected =
                button.getAttribute("data-language") === selectedLanguage;

            button.setAttribute("aria-pressed", String(isSelected));
        });

        try {
            localStorage.setItem(storageKey, selectedLanguage);
        } catch {
            // A tradução continua funcionando se o armazenamento estiver bloqueado.
        }
    }

    function createLanguageSelector() {
        if (document.querySelector("[data-language-selector]")) {
            return;
        }

        const nav = document.querySelector("header nav");

        if (!nav) {
            return;
        }

        const selector = document.createElement("div");
        selector.setAttribute("data-language-selector", "");
        selector.setAttribute("aria-label", "Selecionar idioma");

        Object.assign(selector.style, {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginLeft: "4px",
            fontFamily: "var(--mono)",
            fontSize: "12px",
            whiteSpace: "nowrap"
        });

        ["pt", "en"].forEach((language, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = language.toUpperCase();
            button.setAttribute("data-language", language);
            button.setAttribute(
                "aria-label",
                language === "pt" ? "Português" : "English"
            );
            button.setAttribute("aria-pressed", "false");

            Object.assign(button.style, {
                color: "var(--white)",
                background: "transparent",
                border: "1px solid #454b55",
                borderRadius: "5px",
                padding: "5px 8px",
                cursor: "pointer",
                font: "inherit"
            });

            button.addEventListener("click", () => {
                translatePage(language);
            });

            selector.appendChild(button);

            if (index === 0) {
                const separator = document.createElement("span");
                separator.textContent = "|";
                separator.style.color = "#8d949e";
                selector.appendChild(separator);
            }
        });

        nav.appendChild(selector);
    }

    function initializeTranslations() {
        createLanguageSelector();
        translatePage(getSavedLanguage());
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeTranslations,
            { once: true }
        );
    } else {
        initializeTranslations();
    }
})();

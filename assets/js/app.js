export default {
  methods: {
    answer(ans) {
      if (!this.show_next_button) {
        var answer_id = "abcd".indexOf(ans);
        var correct_answer_id = "abcd".indexOf(
          this.correct_answers[this.question_order[this.number]],
        );
        if (answer_id == correct_answer_id) {
          this.correct_banner = true;
          switch (answer_id) {
            case 0:
              this.a_correct = true;
              this.a_cw = true;
              break;
            case 1:
              this.b_correct = true;
              this.b_cw = true;
              break;
            case 2:
              this.c_correct = true;
              this.c_cw = true;
              break;
            case 3:
              this.d_correct = true;
              this.d_cw = true;
              break;
          }
        } else {
          this.wrong_banner = true;
          switch (correct_answer_id) {
            case 0:
              this.a_correct = true;
              this.a_cw = true;
              break;
            case 1:
              this.b_correct = true;
              this.b_cw = true;
              break;
            case 2:
              this.c_correct = true;
              this.c_cw = true;
              break;
            case 3:
              this.d_correct = true;
              this.d_cw = true;
              break;
          }
          switch (answer_id) {
            case 0:
              this.a_wrong = true;
              this.a_cw = true;
              break;
            case 1:
              this.b_wrong = true;
              this.b_cw = true;
              break;
            case 2:
              this.c_wrong = true;
              this.c_cw = true;
              break;
            case 3:
              this.d_wrong = true;
              this.d_cw = true;
              break;
          }
        }
        this.show = false;
        this.given_answers.push(ans);
        console.log(this.given_answers);
        this.show_next_button = true;
        var that = this;
        setTimeout(function () {
          that.correct_banner = false;
          that.wrong_banner = false;
        }, 1500);
      }
    },
    next_question() {
      if (this.show_next_button) {
        this.a_cw = false;
        this.b_cw = false;
        this.c_cw = false;
        this.d_cw = false;
        this.show_next_button = false;

        this.showq = false;

        if (this.number >= this.question_order.length - 1) {
          var link = "../r/?s=";
          link += window.location.href.slice(
            window.location.href.indexOf("?s=") + 3,
          );
          for (let i = 0; i < this.question_order.length; i++) {
            link += "&";
            link += this.question_order[i];
            link += "=";
            link += this.given_answers[i];
          }
          var nowtime = Date.now();
          link += "&time=" + (nowtime - this.time) / 1000;
          window.open(link, "_self");
        }

        var that = this;
        setTimeout(function () {
          that.a_correct = false;
          that.a_wrong = false;
          that.b_correct = false;
          that.b_wrong = false;
          that.c_correct = false;
          that.c_wrong = false;
          that.d_correct = false;
          that.d_wrong = false;

          that.number++;
          that.show = true;
          that.showq = true;
        }, 1000);
      }
    },
    wait_loader() {
      this.showb = 0;
      var that = this;
      setTimeout(function () {
        that.showb = true;
      }, 1000);
    },
    get_results() {
      var vars = [],
        hash;
      var hashes = window.location.href
        .slice(window.location.href.indexOf("&") + 1)
        .split("&");
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars.push(hash[1]);
      }
      this.vars = vars;

      var rlytrue = 0;

      var maxval = this.vars.length - 1;

      var a = 0;
      var b = 0;
      var c = 0;
      var d = 0;

      var trueslist = [];
      for (var i = 0; i < maxval; i++) {
        if (this.vars[i] == this.correct_answers[this.question_order[i]]) {
          trueslist.push(1);
          rlytrue++;
        } else {
          trueslist.push(0);
        }
        switch (this.vars[i]) {
          case "a":
            a++;
            break;
          case "b":
            b++;
            break;
          case "c":
            c++;
            break;
          case "d":
            d++;
            break;
        }
      }

      var rlyfalse = maxval - rlytrue;

      this.results = [a, b, c, d, rlytrue, rlyfalse, trueslist, maxval];
    },
    load_order() {
      var numbers = window.location.href
        .slice(window.location.href.indexOf("?s=") + 3)
        .split("&")[0];
      var ar = [];
      for (let i = 0; i < numbers.length; i++) {
        ar.push(
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(
            numbers[i],
          ),
        );
      }
      this.question_order = ar;
    },
    load_got_seed() {
      if (window.location.href.search("/?ns=") != -1) {
        var got_seed = window.location.href
          .slice(window.location.href.indexOf("?ns=") + 4)
          .split("&")[0];
        this.got_seed = got_seed;
      }
    },
    save_time() {
      this.time = Date.now();
      if (window.location.href.search("&time=") != -1) {
        this.time = window.location.href
          .slice(window.location.href.indexOf("&time=") + 6)
          .split("&")[0];
      }
    },
  },
  created: function () {
    this.load_order();
    //this.wait_loader();
    this.get_results();
    this.load_got_seed();
    this.save_time();
  },
  data() {
    let quiz = [
      {
        question:
          "Wie heißt das ehemals als „Twitter, Inc.“ bekannte Unternehmen <br>seit März 2023?",
        answers: ["X Corp.", "Y Corp.", "XY Corp.", "Z Corp."],
        correct: "a",
      },
      {
        question: "Wer war der „Erfinder“ von Android?",
        answers: [
          "Hattie Abner",
          "Zack Milo",
          "Andrew Rubin",
          "Gerry Tristram",
        ],
        correct: "c",
      },
      {
        question: "Wer ist der „Erfinder“ von Blender?",
        answers: [
          "Stephen Poplawski",
          "Ton Roosendaal",
          "Joseph Niepce",
          "Ibn al-Haytham",
        ],
        correct: "b",
      },
      {
        question: "Wer hat im Oktober 2022 Twitter aufgekauft?",
        answers: ["Mark Zuckerberg", "Donald Trump", "Bill Gates", "Elon Musk"],
        correct: "d",
      },
      {
        question: "Wer hat WhatsApp gegründet?",
        answers: [
          "Ben Cum, John Cegtion",
          "Jan Koum, Brian Akton",
          "Elon Musk",
          "Mark Zuckerberg",
        ],
        correct: "b",
      },
      {
        question: "Wer hat das „Zen of Python“ verfasst?",
        answers: [
          "Mohammad Hurst",
          "Tim Peters",
          "Tracy Sutcliffe",
          "Rodney Bull",
        ],
        correct: "b",
      },
      {
        question: "Was ist der meist gelikete Post auf Instagram?",
        answers: [
          "Ein Bild von einem Ei",
          "Christian Ronaldo mit <br>seinem Sohn",
          "Lionel Messi beim Feiern <br>des Welttitels",
          "Kylie Jenner mit ihrer <br>Tochter",
        ],
        correct: "c",
      },
      {
        question: "Wer hat die meisten Follower auf Tiktok?",
        answers: [
          "Die Elevator Boys",
          "Charli D'Amelio",
          "Khabane Lame",
          "Bella Poarch",
        ],
        correct: "c",
      },
      {
        question: "Was ist Satire?",
        answers: [
          "Die schlimmste Form <br>von Fake news",
          "Die Wahrheit",
          "Falsche Aussagen, die auf <br>Probleme Aufmerksam machen",
          "Nachrichten von einer <br>großen Zeitung",
        ],
        correct: "c",
      },
      {
        question: "Meine Accounts sind besonders sicher, wenn..?",
        answers: [
          "ich ein einfaches Passwort nutze, <br>das ich mir aber gut merken kann.",
          "ich ein Passwort nutze, dass aus einem <br>langen Wort und einer Zahl besteht.",
          "ich zusätzlich zum Passwort noch die <br>Zwei-Faktor-Authentisierung nutze.",
          "ich ein Passwort nutze, dass aus einem <br>langen Buchstabensalat besteht.",
        ],
        correct: "c",
      },
      {
        question: "Welche Abkürzung steht für die Angst, etwas zu verpassen?",
        answers: ["FOMO", "FTFY", "FWIW", "FYEO"],
        correct: "a",
      },
      {
        question:
          "Wann sind Informationen aus dem Internet vertrauenswürdig? Wenn..?",
        answers: [
          "die Verfasser*innen über <br>18 Jahre alt sind.",
          "sie von meinen Freund*innen <br>geteilt wurden.",
          "die Information aus einem Video <br>stammt, denn diese lassen sich nicht <br>fälschen oder manipulieren.",
          "die Information aktuell und auch <br>auf anderen offiziellen Seiten zu finden ist <br>sowie eine seriöse Quelle für den Inhalt angegeben ist.",
        ],
        correct: "d",
      },
      {
        question: "Was ist das sogenannte „Phantom-Vibrations-Syndrom“?",
        answers: [
          "Ein Anruf von einer unbekannten Nummer.",
          "Wenn ich mir einbilde, dass mein Handy <br>geklingelt oder vibriert hat, <br>obwohl das nicht der Fall war.",
          "Ein defekter Vibrationsmotor am Handy.",
          "Eine Funktion, mit der ich individuelle <br>Vibrations-Muster für mein Handy einstellen kann.",
        ],
        correct: "b",
      },
      {
        question: "Was ist der Unterschied zwischen der USK und der PEGI?",
        answers: [
          "Die USK legt Altersbeschränkungen <br>für Videospiele in Deutschland fest. <br>Die PEGI entscheidet, welche Spiele auf dem Index landen.",
          "Die USK legt Altersbeschränkungen <br>für Videospiele fest, die PEGI für Filme.",
          "Die USK legt Altersbeschränkungen <br>für Videospiele in Deutschland fest, die PEGI für Europa.",
          "Die Alterseinstufungen der USK geht nur <br>bis 18 Jahre, die der PEGI bis 21.",
        ],
        correct: "c",
      },
      {
        question: "Was ist „Funk“ auf YouTube und Co.?",
        answers: [
          "das Unterhaltungs- und Bildungsprogramm <br>der öffentlichen Rundfunkanstalten <br>speziell für junge Menschen",
          "eine neue Tanzvideo-Challenge",
          "ein Dienst, mit dem man <br>Privatnachrichten an andere <br>Streamer schreiben kann",
          "eine Funktion, die dich <br>über neue Videos deines <br>Lieblings-Streamers informiert",
        ],
        correct: "a",
      },
      {
        question:
          "Im Zuge welches Ereignisses wurde der Begriff „Fake News“ <br>häufiger erwähnt?",
        answers: [
          "Wahl von Donald Trump zum US-Präsidenten",
          "9/11",
          "Erste Mondlandung",
          "Vietnamkrieg",
        ],
        correct: "a",
      },
      {
        question: "Rooten und Jailbreak – Was ist das?",
        answers: [
          "zwei coole free-to-play App-Games.",
          "das hat etwas mit den Zugriffsrechten zu tun",
          "Sicherheits-Apps für Android bzw. iOS.",
          "Drahtlosschnittstellen für Android bzw. iOS",
        ],
        correct: "b",
      },
      {
        question: "Mich hat eine unbekannte Nummer angerufen, also..?",
        answers: [
          "rufe ich sofort zurück.",
          "checke ich die Nummer über Google, <br>bevor ich zurückrufe.",
          "checke ich die Nummer über Google, <br>nachdem ich zurückgerufen habe.",
          "leite ich die Nummer an meine <br>Freund*innen weiter. <br>Vielleicht wissen sie, wer mich angerufen hat.",
        ],
        correct: "b",
      },
      {
        question: "Der Begriff „Social Engineering“ beschreibt..?",
        answers: [
          "eine Multiplayer-Kategorie in Games.",
          "wie man leicht irgendwo einbrechen kann.",
          "z.B. Fake-Videos, die von Promis erstellt werden.",
          "z.B. Mails, in denen sich ein Absender <br>als jemand ausgibt, der er nicht ist.",
        ],
        correct: "d",
      },
      {
        question: "Ich möchte mein altes Handy verkaufen. Daher werde ich..?",
        answers: [
          "meine Daten einfach löschen.",
          "mein Handy auf Werkszustand zurücksetzen.",
          "alle Kontoverbindungen entfernen und es <br>auf Werkszustand zurücksetzen.",
          "meine Daten auf einem Speichermedium sichern, <br>alle Kontoverbindungen entfernen und es <br>auf Werkszustand zurücksetzen.",
        ],
        correct: "d",
      },
      {
        question: "Unter dem Begriff „Doomscrolling“ versteht man..?",
        answers: [
          "eine Handverletzung, die durch übermäßiges <br>Scrollen mit dem Daumen hervorgerufen wird.",
          "das Surfen im privaten Browser-Fenster.",
          "das Scrollen im Darknet.",
          "das endlose Scrollen durch negative <br>Nachrichten und damit die übermäßige, <br>zwanghafte Beschäftigung mit ihnen.",
        ],
        correct: "d",
      },
      {
        question: "Was ist „Cybergrooming”?",
        answers: [
          "(meist) sexuell motivierte Kontaktanbahnung im Internet",
          "das Aufhalten im Darknet",
          "das Gleiche wie Cybermobbing",
          "intensive Pflege von Online-Bekanntschaften",
        ],
        correct: "a",
      },
      {
        question: "Die Netiquette ist..?",
        answers: [
          "ein Internettrend aus Frankreich",
          "eine Internetcommunity",
          "eine Verhaltensrichtline im Internet",
          "ein Online-Kompliment",
        ],
        correct: "c",
      },
      {
        question: "Woran erkenne ich eine sichere Webseite?",
        answers: [
          "sie fragt mich nicht nach Cookie-Einstellungen",
          "die Datenschutzerklärung garantiert, <br>dass die Webseite sicher ist <br>(diese Info finde ich meist beim Impressum)",
          "an einer sicheren Verschlüsselung <br>(in der URL steht dann „https“ und ein kleines <br>„Schloss“-Symbol wird abgebildet)",
          "die ersten Ergebnisse der Google-Suche <br>sind die sichersten",
        ],
        correct: "c",
      },
      {
        question: "Was versteht man unter Clickbait?",
        answers: [
          "Das ist eine andere Bezeichnung für „Fake News“. <br>Dahinter verbergen sich Falschmeldungen, <br>die Aufmerksamkeit erregen sollen.",
          "Clickbait soll durch besonders <br>reißerische Überschriften neugierig machen und <br>zum Anklicken eines Posts oder eines Videos verleiten.",
          "Durch Clickbait sollen Daten von Besuchern <br>einer Webseite abgefangen werden.",
          "Als Clickbait bezeichnet man den <br>Button am Ende eines Artikels, <br>der zum Teilen auf Social Media anregen soll.",
        ],
        correct: "b",
      },
      {
        question: "Was sollte man mit Kettenbriefen tun?",
        answers: [
          "einfach löschen",
          "weiterleiten, um andere zu warnen",
          "in anderen sozialen Netzwerken teilen",
          "ernst nehmen und befolgen",
        ],
        correct: "a",
      },
      {
        question:
          "Wie viel Prozent der 12- bis 19-Jährigen besitzen laut JIM-Studie <br>2019 ein eigenes Smartphone?",
        answers: ["75%", "93%", "53%", "84%"],
        correct: "b",
      },
      {
        question:
          "Was hilft langfristig nicht dabei, ein gutes Maß für die <br>Smartphone-Nutzung zu finden?",
        answers: [
          "Regeln für Bildschirmzeiten",
          "Gespräche über Smartphone-Nutzung",
          "Routinen in der Familie",
          "Strikte Verbote",
        ],
        correct: "d",
      },
      {
        question: "Welche Intention steckt meist hinter Fake News?",
        answers: [
          "Likes und Follower gewinnen",
          "in der Journalismus-Branche Fuß fassen",
          "Verunsicherung stiften oder <br>Stimmung gegen eine Sache machen",
          "gar keine Absicht",
        ],
        correct: "c",
      },
      {
        question:
          "Was ist KEINE Anlaufstelle für den Jugendschutz in Internet?",
        answers: [
          "Unterhaltungssoftware Selbstkontrolle (USK)",
          "Kommission für Jungendmedienschutz (KJM)",
          "Bundeszentrale für Kinder- <br>und Jugendmedienschutz (BzKJ)",
          "Freiw. Selbstkontrolle <br>Multimedia-Diensteanbieter (FSM)",
        ],
        correct: "a",
      },
      {
        question: "Welches Kriterium ist für gute Nachrichten NICHT wichtig?",
        answers: [
          "Sensationsgrad",
          "Objektivität",
          "Vollständigkeit",
          "Aktualität",
        ],
        correct: "a",
      },
      {
        question:
          "Was sollten Nutzer*innen tun, wenn sie einen Beitrag als <br>Fake News identifiziert haben?",
        answers: [
          "Ihn ignorieren und weiterscrollen",
          "Die Urheber kontaktieren",
          "Ihn bei den Plattformbetreibern melden",
          "Einen „Daumen nach unten“ geben",
        ],
        correct: "c",
      },
      {
        question: "Wobei helfen gute Jugendschutz-Apps?",
        answers: [
          "Kontrolle von Postings und Surf-Verläufen",
          "Entwicklung von Medienkompetenz",
          "verringern Risiken bei der Gerätenutzung",
          "100 %ige Sicherheit von mobilen Geräten",
        ],
        correct: "c",
      },
      {
        question: "Worüber verbreiten sich Fake News am schnellsten?",
        answers: [
          "über Printmedien und Nachrichtenportale",
          "über Fernsehsender",
          "über soziale Netzwerke und Messenger",
          "über Face-to-Face-Kommunikation",
        ],
        correct: "c",
      },
      {
        question:
          "Was ist das beliebteste Soziale Medium der Deutschen Jugendlichen?",
        answers: ["Facebook", "WhatsApp", "TikTok", "Instagram"],
        correct: "b",
      },
      {
        question: "Ab welchem Alter darf man WhatsApp offiziell nutzen?",
        answers: ["12 Jahre", "13 Jahre", "16 Jahre", "18 Jahre"],
        correct: "b",
      },
      {
        question: "Für welche Summe hat Facebook Whatsapp 2014 gekauft?",
        answers: ["14 Mio. €", "140 Mio. €", "1.4 Mrd. €", "14 Mrd. €"],
        correct: "d",
      },
      {
        question:
          "Wie nennt man die bei Messengern übliche Verschlüsselungs-Methode?",
        answers: [
          "Ende-zu-Ende",
          "SHA-256",
          "argon2id",
          "Cäsar-Verschlüsselung",
        ],
        correct: "a",
      },
      {
        question:
          "Welches Profilbild sollte man in Sozialen Medien am ehesten verwenden?",
        answers: [
          "Das Ortsschild seines Wohnortes",
          "Ein cooles Bild von sich selbst",
          "Ein Foto der Schule",
          "Einen süẞen Hamster",
        ],
        correct: "d",
      },
      {
        question:
          "Wie viel Prozent der deutschen Jugendlichen (12-19 J.) geben an, <br>dass bereits falsche oder beleidigende Dinge über sie im Internet verbreitet wurden?",
        answers: ["6%", "10%", "21%", "42%"],
        correct: "c",
      },
      {
        question: "Was ist das sicherste Passwort?",
        answers: [
          "Passwort",
          "Baum1234",
          "MOgj7u9/0idK!",
          "tmLtUkWfaJfkjhq6Xdyp",
        ],
        correct: "b",
      },
      {
        question: "Was ist Discord?",
        answers: [
          "ein Messenger",
          "ein Onlineshop",
          "ein Internetbrowser",
          "ein Kochbuch",
        ],
        correct: "c",
      },
      {
        question: "Wie viel verdient Elon Musk pro Tag?",
        answers: [
          "ca. 797 Mio. €",
          "ca. 322 Mio. €",
          "ca. 151 Mio. €",
          "ca. 402 Mio. €",
        ],
        correct: "d",
      },
      {
        question: "Was ist LinkedIn?",
        answers: [
          "ein Messenger",
          "ein Onlineshop",
          "ein Internetbrowser",
          "ein Soziales Netzwerk <br>für Geschäftskontakte",
        ],
        correct: "a",
      },
      {
        question: "Was bedeutet finsta?",
        answers: [
          "fishy Insta(gram)",
          "a fail on Insta(gram)",
          "fake Insta(gram)",
          "Insta(gram) im Darknet",
        ],
        correct: "c",
      },
      {
        question: "Wer hat die meisten Follower auf Instagram?",
        answers: [
          "Cristiano Ronaldo",
          "Instagram",
          "Justin Bieber",
          "Kylie Jenner",
        ],
        correct: "d",
      },
      {
        question: "Seit wann gibt es Instagram?",
        answers: [
          "Oktober 2010",
          "Januar 2009",
          "Dezember 2011",
          "August 2008",
        ],
        correct: "c",
      },
      {
        question: "Wie heißt der Vorgänger von TikTok?",
        answers: ["TikTak", "Musiclaly", "Tok.Tok", "Musical.ly"],
        correct: "a",
      },
      {
        question:
          "Wieviele Minuten verbringt ein durchschnittlicher deutscher <br>Jugendlicher täglich online?",
        answers: ["69", "124", "241", "394"],
        correct: "c",
      },
      {
        question:
          "Wie wird eine Person genannt, die Fake News aus Vergnügen <br>und für Aufmerksamkeit erstellt?",
        answers: ["Troll", "Prankster", "Cyberbully", "NPC"],
        correct: "a",
      },
      {
        question: "YouTube hat eine Plattform für Kinder. Wie heißt sie?",
        answers: ["Kids-TV", "YouKids", "YouTube Kids", "Kids on YouTube"],
        correct: "c",
      },
      {
        question: "Wann kam das erste Handy auf den Markt?",
        answers: ["März 1983", "Januar 1990", "September 2001", "Juni 1996"],
        correct: "a",
      },
      {
        question:
          "Wie heißt eine von Donald Trump 2022 gegründete Social-Media-Plattform?",
        answers: [
          "Social Truth",
          "The Real Truth",
          "Truth Social",
          "Trump Social",
        ],
        correct: "c",
      },
      {
        question:
          "Wie nennt man ein gefälschtes Video von einer Person, das mithilfe <br>künstlicher Intelligenz erstellt wurde?",
        answers: ["Fake News", "Fakevid", "VidPrank", "Deepfake"],
        correct: "c",
      },
      {
        question: "Was ist ein Social Bot?",
        answers: [
          "Eine Person, die ständig online ist",
          "Ein Programm, das menschliches <br>Verhalten in sozialen Medien simuliert",
          "Ein Programm, das alle meine Apps verwalten kann",
          "Eine Drohne, die coole Fotos machen kann",
        ],
        correct: "a",
      },
      {
        question:
          "Welche Informationen sollten auf meinem Social-Media-Profil <br>öffentlich sichtbar sein?",
        answers: ["Telefonnummer", "Adresse", "Vor- und Nachmame", "Gar keine"],
        correct: "c",
      },
      {
        question: "Was ist keine sicherere Alternative zu WhatsApp?",
        answers: ["Threema", "Wire", "Signal", "Facebook Messenger"],
        correct: "d",
      },
      {
        question: "Was ist Hate Speech?",
        answers: [
          "Videos von Wutanfällen auf YouTube",
          "Lästereien in Klassenchats",
          "Hassnachrichten, die sich gegen <br>bestimmte Menschengruppen richten",
          "Falschnachrichten in Online-Foren",
        ],
        correct: "c",
      },
    ];

    let questions = quiz.map((q) => q.question);
    let answers = quiz.map((q) => q.answers);
    let correct_answers = quiz.map((q) => q.correct);

    return {
      questions: questions,
      answers: answers,
      correct_answers: correct_answers,

      /* das hier sollte man in ruhe lassen */
      number: 0,
      given_answers: [],
      show: true,
      showq: true,
      showb: true,

      a_correct: false,
      b_correct: false,
      c_correct: false,
      d_correct: false,
      a_wrong: false,
      b_wrong: false,
      c_wrong: false,
      d_wrong: false,
      a_cw: false,
      b_cw: false,
      c_cw: false,
      d_cw: false,
      show_next_button: 0,
      correct_banner: false,
      wrong_banner: false,
      vars: [],
      results: [],
      spinner_template:
        '<div class="atom-spinner atom-scale"><div class="spinner-inner"><div class="spinner-line"></div><div class="spinner-line"></div><div class="spinner-line"></div><!--Chrome renders little circles malformed :(--><div class="spinner-circle">&#9679;</div></div></div>',
      question_order: [],
      bw: false,
      got_seed: "",
      time: 0,
    };
  },
  computed: {
    vueWidthProg() {
      return {
        "--percent": (100 * this.number) / this.question_order.length + "%",
      };
    },
  },
};

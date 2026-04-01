import { Component, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent implements AfterViewInit, OnInit {
  currentLang: string = 'EN';
  isLangMenuOpen: boolean = false;

  languages = [
    { code: 'HU', name: 'Hungarian', flag: '🇭🇺' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'FR', name: 'French', flag: '🇫🇷' },
    { code: 'DE', name: 'German', flag: '🇩🇪' },
    { code: 'IT', name: 'Italian', flag: '🇮🇹' }
  ];

  translations: Record<string, any> = {
    'EN': {
      mainTitle: 'Discover the Craft',
      s1h: 'The Art of Botanical Silk',
      s1b: 'At Ayurustic, craftsmanship begins with material integrity.<br>\nWe combine 100% mulberry silk with plant-based colour traditions<br>\ninspired by Ayurvastra practices. The result is silk shaped by<br>\nheritage and refined for modern living.',
      s2h: '100% Mulberry Silk',
      s2b: 'We use only long-fibre mulberry silk, valued for its smooth<br>\ntexture, strength, and natural sheen.<br>\nThe fabric is lightweight, breathable, and fluid in drape —<br>\noffering comfort without compromising refinement',
      s3h: 'Botanical Colour',
      s3b: 'Our silk is coloured using plant-based formulations prepared through a slow,<br>\ncontrolled process. Unlike conventional chemical dyes, botanical applications<br>\nallow the fabric to absorb tone gradually, producing depth and subtle variation.<br>\n<br>\nNo two pieces are identical. Slight tonal shifts are not flaws — they<br>\nare the natural signature of botanical dyeing.',
      s4h: 'Crafted with<br>Intention',
      s4b: 'From preparation to finishing,<br>\neach stage demands time<br>\nand precision. We prioritise<br>\nmaterial respect, careful<br>\nhandling, and consistency<br>\nin quality.'
    },
    'HU': {
      mainTitle: 'Fedezze fel a Mesterséget',
      s1h: 'A Botanikai Selyem Művészete',
      s1b: 'Az Ayurusticnál a kézművesség az anyag integritásával kezdődik.<br>\nA 100%-os eperfás selymet növényi alapú színezési hagyományokkal<br>\nötvözzük, melyeket az Ayurvastra gyakorlatai ihlettek. Az eredmény<br>\negy örökség által formált, modern élethez finomított selyem.',
      s2h: '100% Eperfás Selyem',
      s2b: 'Kizárólag hosszúszálú eperfa selymet használunk, melyet sima<br>\ntextúrája, ereje és természetes fénye tesz értékessé.<br>\nA szövet könnyű, légáteresztő és lágyan omló —<br>\nkényelmet kínál anélkül, hogy kompromisszumot kötne az eleganciában.',
      s3h: 'Botanikai Színek',
      s3b: 'Selymünket növényi alapú formulák segítségével, lassú, ellenőrzött<br>\neljárással színezzük. A hagyományos vegyi festékekkel ellentétben<br>\na botanikai módszerek fokozatos tónusfelvételt tesznek lehetővé,<br>\nmélységet és finom változatosságot eredményezve.<br>\n<br>\nNincs két egyforma darab. Az enyhe tónuseltérések nem hibák —<br>\nhanem a botanikai festés természetes védjegyei.',
      s4h: 'Szándékkal<br>Készítve',
      s4b: 'Az előkészítéstől a befejezésig,<br>\nminden szakasz időt és<br>\nprecizitást igényel. Előtérbe<br>\nhelyezzük az anyag tiszteletét,<br>\na gondos kezelést és a<br>\nminőségi következetességet.'
    },
    'FR': {
      mainTitle: 'Découvrez l\'Artisanat',
      s1h: 'L\'Art de la Soie Botanique',
      s1b: 'Chez Ayurustic, l\'artisanat commence par l\'intégrité des matériaux.<br>\nNous associons la soie de mûrier 100 % à des traditions de couleurs<br>\nvégétales inspirées des pratiques Ayurvastra. Le résultat est une soie<br>\nfaçonnée par l\'héritage et raffinée pour la vie moderne.',
      s2h: '100 % Soie de Mûrier',
      s2b: 'Nous utilisons uniquement de la soie de mûrier à fibres longues,<br>\nprisée pour sa texture lisse, sa résistance et son éclat naturel.<br>\nLe tissu est léger, respirant et fluide dans son drapé —<br>\noffering un confort sans compromettre le raffinement.',
      s3h: 'Couleur Botanique',
      s3b: 'Notre soie est colorée à l\'aide de formulations végétales préparées par un processus<br>\nlent et contrôlé. Contrairement aux colorants chimiques conventionnels, les<br>\napplications botaniques permettent au tissu d\'absorber le ton progressivement,<br>\nproduisant ainsi de la profondeur et des variations subtiles.<br>\n<br>\nAucune pièce n\'est identique. De légers changements de ton ne sont pas des<br>\ndéfauts — c\'est la signature naturelle de la teinture botanique.',
      s4h: 'Confectionné avec<br>Intention',
      s4b: 'De la préparation à la finition,<br>\nchaque étape exige du temps<br>\net de la précision. Nous<br>\npriorisons le respect des<br>\nmatériaux, la manipulation<br>\nsoigneuse et la qualité.'
    },
    'DE': {
      mainTitle: 'Entdecken Sie das Handwerk',
      s1h: 'Die Kunst der Botanischen Seide',
      s1b: 'Bei Ayurustic beginnt die Handwerkskunst bei der Materialintegrität.<br>\nWir kombinieren 100% Maulbeerseide mit pflanzlichen Farbtraditionen,<br>\ninspiriert von Ayurvastra-Praktiken. Das Ergebnis ist eine Seide,<br>\ndie von der Tradition geprägt und für das moderne Leben verfeinert ist.',
      s2h: '100% Maulbeerseide',
      s2b: 'Wir verwenden nur langfasrige Maulbeerseide, die für ihre glatte<br>\nTextur, Festigkeit und ihren natürlichen Glanz geschätzt wird.<br>\nDer Stoff ist fließend, leicht, atmungsaktiv und bietet —<br>\nKomfort, ohne Kompromisse bei der Raffinesse einzugehen.',
      s3h: 'Botanische Farbe',
      s3b: 'Unsere Seide wird mit pflanzlichen Formeln gefärbt, die in einem langsamen,<br>\nkontrollierten Prozess hergestellt werden. Im Gegensatz zu chemischen<br>\nFarben ermöglichen botanische Anwendungen eine allmähliche Aufnahme der<br>\nFarbtöne und erzeugen so Tiefe und subtile Variationen.<br>\n<br>\nKeine zwei Teile sind identisch. Leichte Tonverschiebungen sind keine<br>\nFehler — sie sind das natürliche Markenzeichen des botanischen Färbens.',
      s4h: 'Mit Absicht<br>Gefertigt',
      s4b: 'Von der Vorbereitung bis zum<br>\nAbschluss erfordert jede Phase<br>\nZeit und Präzision. Wir<br>\npriorisieren den Respekt vor dem<br>\nMaterial, sorgfältige Handhabung<br>\nund gleichbleibende Qualität.'
    },
    'IT': {
      mainTitle: 'Scopri l\'Artigianato',
      s1h: 'L\'Arte della Seta Botanica',
      s1b: 'Da Ayurustic, l\'artigianato inizia con l\'integrità dei materiali.<br>\nCombiniamo seta di gelso al 100% con tradizioni di colori vegetali<br>\nispirate alle pratiche Ayurvastra. Il risultato è seta plasmata dal<br>\npatrimonio e raffinata per la vita moderna.',
      s2h: '100% Seta di Gelso',
      s2b: 'Usiamo solo seta di gelso a fibra lunga, apprezzata per la sua<br>\ntrama liscia, forza e lucentezza naturale.<br>\nIl tessuto è leggero, traspirante e fluido nel drappeggio —<br>\noffrendo comfort senza compromettere la raffinatezza.',
      s3h: 'Colore Botanico',
      s3b: 'La nostra seta è colorata con formulazioni vegetali preparate attraverso un lento<br>\ne controllato processo. A differenza dei coloranti chimici, le applicazioni<br>\nbotaniche permettono al tessuto di assorbire il tono gradualmente,<br>\nproducendo profondità e sottili variazioni.<br>\n<br>\nNessun pezzo è identico. Le lievi variazioni di tono non sono difetti —<br>\nrappresentano la firma naturale della tintura botanica.',
      s4h: 'Realizzato con<br>Intenzione',
      s4b: 'Dalla preparazione alla finitura,<br>\nogni fase richiede tempo e<br>\nprecisione. Diamo priorità al<br>\nrispetto dei materiali, alla<br>\ncura nella manipolazione<br>\ne alla costanza qualitativa.'
    }
  };

  get t() {
    return this.translations[this.currentLang];
  }

  setLang(langCode: string) {
    this.currentLang = langCode;
    this.isLangMenuOpen = false;
  }

  toggleLangMenu() {
    this.isLangMenuOpen = !this.isLangMenuOpen;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  ngAfterViewInit() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -8% 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }


  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const wrapper = img.parentElement;
    if (wrapper) {
      const fallback = wrapper.querySelector('.fallback-card') as HTMLElement;
      if (fallback) fallback.style.display = 'flex';
    }
  }
}
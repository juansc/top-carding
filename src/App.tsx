import './App.css';
import {useState} from "react";
import {TIMEOUT} from "dns";

function App() {
    const [cardDeck, setCardDeck] = useState(shuffleDeck(StandardDeck()));

    return (
        <div className="App">
            <header className="App-header">
                <Game cards={cardDeck} fn={setCardDeck}/>
            </header>
        </div>
    );
}

interface GameProps {
    cards: Card[],
    fn: (cards: Card[]) => void;
}

function Game(props: GameProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const drainPile = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const useStandardDeck = () => {
        props.fn(shuffleDeck(StandardDeck()));
        setCurrentIndex(0);
    };

    const useCartographers = () => {
        props.fn(shuffleDeck(CartographersNoMonstersDeck()));
        setCurrentIndex(0);
    };

    const shuffle = () => {
        props.fn(shuffleDeck(props.cards));
        setCurrentIndex(0);
    };

    return (
        <div>
            <div>
                <button onClick={useStandardDeck}>Standard Deck</button>
                <button onClick={useCartographers}>Cartographers (No Monsters)</button>
                <button onClick={shuffle}>Shuffle</button>
            </div>
            <CardGrid cards={props.cards} current_index={currentIndex} callback={drainPile}/>
        </div>
    );
}

function shuffleDeck<T>(array: Array<T>): Array<T> {
    array.reverse().forEach((item, index) => {
        const j = Math.floor(Math.random() * (index + 1));
        [array[index], array[j]] = [array[j], array[index]];
    });

    return array;
}

class Card {
    image_url: string;
    styles: Record<string, any>;

    constructor(image_url: string, styles?: Object) {
        this.image_url = image_url;
        this.styles = styles || {"float": "left"};
        if (!("background" in this.styles)) {
            this.styles["background"] = `url(${image_url})`;
        }
    }
}

function heroesCard(xOffset: number, yOffset: number) : Card {
    const cardWidth = 186;
    const cardHeight = 258;
    const cardScale = 1150;
    return new Card('./cards/cartographers/heroes_play_cards_final.jpeg', {
            "borderRadius": "5px",
            "float": "left",
            "width": `${cardWidth}px`,
            "height": `${cardHeight}px`,
            "background": `url('./cards/cartographers/heroes_play_cards_final.jpeg') -${xOffset}px -${yOffset}px / ${cardScale}px`,
        }
    );
}

function TimberGrove() :Card {
    return heroesCard(2, 18);
}

function FrontierDwelling() :Card {
    return heroesCard(191, 18);
}

function WoodlandCrossroads() :Card {
    return heroesCard(380, 18);
}

function MangrooveSwamp() :Card {
    return heroesCard(572, 15);
}

function Pasture() :Card {
    return heroesCard(765, 12);
}

function CoastalEncampment() :Card {
    return heroesCard(960, 2);
}

function WildwoodGarden() : Card {
    return heroesCard(85,280);
}

function Settlement() : Card {
    return heroesCard(280, 280);
}

function KethrasGates() : Card {
    return heroesCard(475, 280);
}

function Lagoon() : Card {
    return heroesCard(665, 275);
}

function HillsideTerrace() : Card {
    return heroesCard(860, 270);
}

function CartographersFullDeck(): Card[] {
    const numRows = 4;
    const numCols = 6;
    let cards = [];
    const factor = 1;
    const cardHeight = 258 * factor;
    const cardWidth = 186 * factor;
    const cardScale = 1119 * factor;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const xOffset = col * -cardWidth;
            const yOffset = row * -cardHeight;
            cards.push(new Card('./cards/cartographers/play_card_sheet.jpeg', {
                    "borderRadius": "5px",
                    "float": "left",
                    "width": `${cardWidth}px`,
                    "height": `${cardHeight}px`,
                    "background": `url('./cards/cartographers/play_card_sheet.jpeg') ${xOffset}px ${yOffset}px / ${cardScale}px`,
                }
            ))
        }
    }

    return cards.slice(0, cards.length - 4 + 1);
}

function CartographersNoMonstersDeck(): Card[] {
    let deck = CartographersFullDeck();
    deck = deck.slice(8);
    deck.push(
        TimberGrove(), FrontierDwelling(), WoodlandCrossroads(), MangrooveSwamp(), CoastalEncampment(), Pasture(),
        WildwoodGarden(), Settlement(), KethrasGates(), Lagoon(), HillsideTerrace()
    );
    return deck
}

function StandardDeck(): Card[] {
    const cardURLs = [
        "./cards/standard/10_of_clubs.png",
        "./cards/standard/10_of_diamonds.png",
        "./cards/standard/10_of_hearts.png",
        "./cards/standard/10_of_spades.png",
        "./cards/standard/2_of_clubs.png",
        "./cards/standard/2_of_diamonds.png",
        "./cards/standard/2_of_hearts.png",
        "./cards/standard/2_of_spades.png",
        "./cards/standard/3_of_clubs.png",
        "./cards/standard/3_of_diamonds.png",
        "./cards/standard/3_of_hearts.png",
        "./cards/standard/3_of_spades.png",
        "./cards/standard/4_of_clubs.png",
        "./cards/standard/4_of_diamonds.png",
        "./cards/standard/4_of_hearts.png",
        "./cards/standard/4_of_spades.png",
        "./cards/standard/5_of_clubs.png",
        "./cards/standard/5_of_diamonds.png",
        "./cards/standard/5_of_hearts.png",
        "./cards/standard/5_of_spades.png",
        "./cards/standard/6_of_clubs.png",
        "./cards/standard/6_of_diamonds.png",
        "./cards/standard/6_of_hearts.png",
        "./cards/standard/6_of_spades.png",
        "./cards/standard/7_of_clubs.png",
        "./cards/standard/7_of_diamonds.png",
        "./cards/standard/7_of_hearts.png",
        "./cards/standard/7_of_spades.png",
        "./cards/standard/8_of_clubs.png",
        "./cards/standard/8_of_diamonds.png",
        "./cards/standard/8_of_hearts.png",
        "./cards/standard/8_of_spades.png",
        "./cards/standard/9_of_clubs.png",
        "./cards/standard/9_of_diamonds.png",
        "./cards/standard/9_of_hearts.png",
        "./cards/standard/9_of_spades.png",
        "./cards/standard/ace_of_clubs.png",
        "./cards/standard/ace_of_diamonds.png",
        "./cards/standard/ace_of_hearts.png",
        "./cards/standard/ace_of_spades.png",
        "./cards/standard/jack_of_clubs.png",
        "./cards/standard/jack_of_diamonds.png",
        "./cards/standard/jack_of_hearts.png",
        "./cards/standard/jack_of_spades.png",
        "./cards/standard/king_of_clubs.png",
        "./cards/standard/king_of_diamonds.png",
        "./cards/standard/king_of_hearts.png",
        "./cards/standard/king_of_spades.png",
        "./cards/standard/queen_of_clubs.png",
        "./cards/standard/queen_of_diamonds.png",
        "./cards/standard/queen_of_hearts.png",
        "./cards/standard/queen_of_spades.png",
    ];
    let cards: Card[] = [];
    cardURLs.forEach((url) => {
        cards.push(new Card(url, {
            "float": "left",
            "backgroundSize": "125px",
        }));
    })
    return cards;
}

interface CardProps {
    cards: Card[]
    current_index: number,
    callback: () => void;
}

// CardGrid displays the current deck in the following way:
// 1. It only displays the cards up to current_index (current_index is 1 indexed)
// 2. It displays the current card separately as the most recent card.
// 3. Displays previous cards in reverse chronological order.
function CardGrid(props: CardProps) {
    let cardsToDisplay = props.cards.slice(0, props.current_index);
    cardsToDisplay.reverse();
    const history = cardsToDisplay.slice(1);
    let rows = chunkArray(history, 1);
    const cardsRemaining = props.cards.length - props.current_index;
    let deckClicker = () => {
    };
    if (cardsRemaining !== 0) {
        deckClicker = props.callback;
    }
    const myStyle: Record<string, any> = {
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "center",
    };
    return (
        <div>
            <div style={myStyle}>
                <figure style={{"float": "left"}}>
                    <p><img className={"card"} src={"./cards/card_back.png"} alt={"card back"} onClick={deckClicker}/>
                        <figcaption>{cardsRemaining}</figcaption>
                    </p>
                </figure>
                {cardsToDisplay.length > 0 &&
                    <div style={cardsToDisplay[0].styles} className={"top-card card"}
                    />}
            </div>
            <table id={"words-table"}>
                <tbody id={"words"}>
                {rows.map((row, ind) => {
                    return (
                        <tr key={ind}>
                            {row.map((card, ind) => {
                                console.log(card.styles)
                                return (
                                    <td>
                                        <div style={card.styles} className={"card"}/>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

function chunkArray<T>(list: Array<T>, n: number): Array<Array<T>> {
    if (list.length === 0) {
        return [] as T[][];
    }
    let chunked: T[][] = [];
    for (let i = 0; i < list.length; i += n) {
        chunked.push(list.slice(i, i + n));
    }
    return chunked
}

export default App;

/*
display: flex;
flex-direction: row;
justify-content: center;
 */
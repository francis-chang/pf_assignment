import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Modal, Button } from "react-native";
import QRReader from "./components/QRReader";

export default function App() {
    const [text, setText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openQR, setOpenQR] = useState(false);
    const [choices, setChoices] = useState([]);
    const [error, setError] = useState("");

    const swapStrings = text => {
        const lower = text.toLowerCase();
        let arr = lower.split("");
        let newArr = arr.map((letter, i) => {
            if (letter === "i" || letter === "l") {
                return 1;
            } else if (letter === "o") {
                return 0;
            }
        });
        return newArr.join("");
    };

    const submit = () => {
        const newStr = swapStrings(text);
        if (!testStrings(newStr)) {
            setError(
                "Error: code must be either 10 digit numeric or 8/16 character hex"
            );
            setText("");
        } else {
            const fiveChoices = choices.slice(-4);
            setChoices([...fiveChoices, newStr]);
            setText("");
            setError("");
        }
    };

    const submitFromQR = d => {
        const modifiedD = swapStrings(d);
        if (!testStrings(modifiedD)) {
            setError(
                "Error: code must be either 10 digit numeric or 8/16 character hex"
            );
            setText("");
        } else {
            const fiveChoices = choices.slice(-4);
            setChoices([...fiveChoices, modifiedD]);
            setText("");
            setError("");
        }
    };

    const setSavedToText = t => {
        setText(t);
        setOpenModal(false);
    };

    const testStrings = t => {
        let regexes = {
            numeric: new RegExp("[0-9]{10}"),
            hex8: new RegExp("[0-9a-fA-F]{8}"),
            hex16: new RegExp("[0-9a-fA-F]{16}")
        };
        if (
            regexes.numeric.test(t) ||
            regexes.hex8.test(t) ||
            regexes.hex16.test(t)
        ) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <View style={styles.container}>
            {error ? (
                <Text style={{ fontSize: 25, color: "red", marginBottom: 40 }}>
                    {error}
                </Text>
            ) : null}
            <TextInput
                style={styles.input}
                onChangeText={t => setText(t)}
                value={text}
                placeholder="Input Code Here"
                onSubmitEditing={submit}
            />
            <Button
                onPress={() => setOpenModal(true)}
                title={`Open Recent Codes (${choices.length})`}
            ></Button>
            <Modal
                animationType="slide"
                transparent={false}
                visible={openModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.container}>
                    <Text style={{ fontSize: 25 }}>
                        Pick one or close modal
                    </Text>
                    {choices.map((choice, i) => (
                        <Button
                            style={styles.buttonText}
                            key={i}
                            onPress={() => setSavedToText(choice)}
                            title={choice}
                            color="red"
                        ></Button>
                    ))}
                    <Button
                        onPress={() => setOpenModal(false)}
                        title="Close Modal"
                    ></Button>
                </View>
            </Modal>

            <Button
                onPress={() => setOpenQR(true)}
                title="Scan code with QR"
            ></Button>
            <Modal
                transparent={false}
                visible={openQR}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <QRReader
                    submit={submitFromQR}
                    setOpenQR={setOpenQR}
                    setError={setError}
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    input: {
        fontSize: 30,
        width: "90%",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 4
    },
    buttonText: {
        fontSize: 25,
        color: "#000"
    }
});

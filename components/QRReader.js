import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { BarCodeScanner } from "expo-barcode-scanner";

export default class QRReader extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-end"
                }}
            >
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : this.handleBarCodeScanned
                    }
                    style={{ width: "100%", height: "100%" }}
                />
                <Button
                    title="Close Camera"
                    onPress={() => this.props.setOpenQR(false)}
                ></Button>
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        let regexes = {
            numeric: new RegExp("^[0-9]*$")
        };
        if (data.length === 10) {
            rege;
        }
        this.props.submit(data);
        this.props.setOpenQR(false);
    };
}

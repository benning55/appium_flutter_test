import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';
import 'package:myapp/pages/login.dart';

void main() {
  enableFlutterDriverExtension();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  void _decrementCounter() {
    setState(() {
      _counter--;
    });
  }

  void _showDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {

        return AlertDialog(
          title: new Text("Alert message !"),
          content: Text("Welcome to ExecuteAutomation" + _counter.toString(), key: Key("alert_text")),
          actions: <Widget>[
            new FlatButton(
              onPressed: () {
                Navigator.of(context).pop();
              }, 
              child: new Text("Close", key: Key("close_button"),),
            )
          ],
        );
      }
    );
  }

  @override
  Widget build(BuildContext context) {

    final loginButon2 = Material(
      elevation: 5.0,
      borderRadius: BorderRadius.circular(30.0),
      color: Color(0xff01A0C7),
      child: MaterialButton(
        key: Key('goLogin'),
        minWidth: MediaQuery.of(context).size.width,
        padding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        child: Text("Go to Log in Pages"),
        onPressed: () {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => Login()));
        },
      ),
    );

    final checkField = TextField(
      obscureText: false,
      decoration: InputDecoration(
        contentPadding: EdgeInsets.fromLTRB(20, 15, 20, 15),
        hintText: "hello",
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(32))
      ),
    );

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        key: Key('FlutterDemo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
              key: Key('textCheck'),
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
              key: Key('counter'),
            ),
            loginButon2,
            new Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                new RaisedButton(
                  onPressed: () {
                    _showDialog();
                  },
                  key: Key("add"),
                  padding: const EdgeInsets.all(8.0),
                  textColor: Colors.white,
                  color: Colors.blue,
                  child: Text("Show"),
                ),
                new RaisedButton(
                  onPressed: () {
                    _decrementCounter();
                  },
                  key: Key("sub"),
                  padding: const EdgeInsets.all(8.0),
                  textColor: Colors.white,
                  color: Colors.red,
                  child: new Text("Subtract"),
                )
              ],
            ),
            checkField
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
        key: Key('increment'),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

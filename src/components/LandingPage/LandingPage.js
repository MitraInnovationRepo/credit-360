import React, { Component } from "react";
import {
  Icon,
  Container,
  Header,
  Grid,
  Label,
  Button,
  Image,
  Search,
  Message
} from "semantic-ui-react";
import _ from "lodash";
import * as styles from "./LandingPage.less";
import { Footer } from "../Footer";
import { Details } from "../Details";
import { Summary } from "../Summary";
import { History } from "../History";
import { Insights } from "../Insights";
import { LinksPage } from "../LinksPage";
import data from "../../data.json";

const source = [
  {
    tags: "JamesWilliam,William,James,Jamey,John,Doe,1632960564",
    personId: "JamesWilliam",
    name: "James Williams"
  },
  {
    tags: "PeterHarington,Peter,Harrington,Pete,Petra",
    personId: "PeterHarington",
    name: "Peter Harrington"
  },
  {
    tags: "MichelleSmith,Michelle,Smith,Michela,Jane,Doe",
    personId: "MichelleSmith",
    name: "Michelle Smith"
  },
  {
    tags: "oliver,williams,",
    personId: "JamesWilliam",
    name: "Oliver Williams"
  },
  {
    tags: "emily,clark,mia,01632 960609,1632960609",
    personId: "JamesWilliam",
    name: "Emily Clark"
  },
  {
    tags: "Anna,Hendricks",
    personId: "AnnaHendricks",
    name: "Anna Hendricks"
  }
];

const categories = [
  "CREDIT MATURITY",
  "CREDIT HISTORY",
  "LOCATION CONSISTENCY",
  "FOO",
  "BAR"
];

const resultRenderer = ({ name }) => <Label key={name} content={name} />;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchable: false,
      search: "",
      state: "search",
      navigationState: "summary",
      activeItem: categories[0]
    };
  }

  changeState(name, value) {
    this.setState({
      [name]: value
    });
  }

  handleStateChange = state => {
    this.setState({
      navigationState: state
    });
  };

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({
      value: result.name,
      state: "dashboard",
      personId: result.personId
    });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.tags);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };

  getComponent(mobile) {

    if (data[this.state.personId].remarks) {
      return (<Grid>
        <Grid.Row centered>
          <Grid.Column width={12}>
            <Message icon>
              <Icon name='wait' />
              <Message.Content>
                <Message.Header>Content Not Available</Message.Header>
                {data[this.state.personId].remarks}
              </Message.Content>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>);
    }

    const scoreData = {
      minScore: data.metaInformation.minCreditScore,
      maxScore: data.metaInformation.maxCreditScore,
      score: data[this.state.personId].creditScore
    };

    const summaryData = data[this.state.personId].categories.map(category => {
      return {
        title: category.title,
        topLevelScores: [
          { x: 1, y: category.maxScore - category.score },
          { x: 2, y: category.score }
        ]
      };
    });

    const country = data[this.state.personId].country;
    const scoreHistoricalData = data[this.state.personId].creditScoreHistory;

    switch (this.state.navigationState) {
      case "summary":
        return (
          <Summary
            mobile={mobile}
            statsData={summaryData}
            scoreData={scoreData}
          />
        );
        break;

      case "details":
        const locationData = data[this.state.personId].categories
          .filter(category => category.title === "Location")[0]
          .subCategories.filter(
            subCategory => subCategory.title === "Location Consistency"
          )[0].zonalData;
        return (
          <Details
            statsData={summaryData}
            categoricalData={data[this.state.personId].categories}
            country={country}
            locationData={locationData}
          />
        );
        break;

      case "history":
        let categoricalData = {};
        _.each(
          data[this.state.personId].categoricalHistory,
          (historicalItems, key) => {
            let data = historicalItems.map(item => {
              return {
                title: item.title,
                topLevelScores: [
                  { x: 1, y: 10 - item.score },
                  { x: 2, y: item.score }
                ]
              };
            });
            categoricalData[key] = data;
          }
        );
        return (
          <History
            data={scoreHistoricalData}
            categoricalData={categoricalData}
          />
        );
        break;

      case "insights":
        return <Insights data={data[this.state.personId].categories} />;
        break;

      case "settings":
        return <LinksPage />;
        break;

      default:
        return (<Summary
          mobile={mobile}
          statsData={summaryData}
          scoreData={scoreData}
        />);
        break;
    }
  }

  getFooterContent() {

    if (data[this.state.personId].remarks) {
      return null;
    }

    return (
      <Footer handleStateChange={this.handleStateChange} />
    );

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { mobile } = this.props;
    const { isLoading, value, results } = this.state;

    const header = (
      <Header style={{ minHeight: "35px" }} textAlign="center">
        <Image
          src={
            "data:image/png;base64,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"
          }
          style={{ width: "80px", paddingTop: "10px" }}
        />
      </Header>
    );

    if (this.state.state === "search") {
      return (
        <Container fluid>
          <Grid style={{ height: "100vh" }}>
            <Grid.Row centered style={{ height: "10vh" }}>
              <Grid.Column width={16}>{header}</Grid.Column>
            </Grid.Row>
            <Grid.Row
              verticalAlign="middle"
              centered
              style={{ height: "90vh" }}
            >
              <Grid.Column width={8} verticalAlign="middle">
                <Search
                  input={{ icon: "search" }}
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true
                  })}
                  results={results}
                  value={value}
                  {...this.props}
                  resultRenderer={resultRenderer}
                  size="large"
                  fluid
                  noResultsDescription='Please refine your search to include exact name, phone number or national identity number.'
                  noResultsMessage={<Header content='No person was found matching your request.' />}
                  minCharacters={4}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
    } else {
      if (mobile) {
        return (
          <div fluid className={styles["mobile-maincontent"]}>
            <Grid>
              <Grid.Row centered>
                <Grid.Column width={16}>
                  <Grid>
                    <Grid.Row centered>
                      <Grid.Column width={16}>
                        {header}
                        <Button
                          icon="search"
                          floated="right"
                          className={styles.mobileSearchBtn}
                          onClick={() =>
                            window.location = '/'
                          }
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                      <Grid.Column width={16}>
                        {this.getComponent(mobile)}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {this.getFooterContent()}
          </div>
        );
      }
      return (
        <Container fluid>
          <Grid>
            <Grid.Row centered>
              <Grid.Column width={16}>
                <Grid>
                  <Grid.Row centered>
                    <Grid.Column width={16}>
                      {header}
                      <Button
                        icon="search"
                        floated="right"
                        className={styles.searchBtn}
                        onClick={() =>
                          window.location = '/'
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Grid.Column width={16}>{this.getComponent()}</Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.getFooterContent()}
        </Container>
      );
    }
  }
}

export default LandingPage;

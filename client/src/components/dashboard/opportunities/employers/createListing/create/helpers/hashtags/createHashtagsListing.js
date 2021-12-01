import React, { Component, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import "./styles.css";
import { connect } from "react-redux";
import { saveListingData } from "../../../../../../../../redux/actions/employer/listings/listingData.js";
import _ from "lodash";

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

class CreateHashtagsListingComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            suggestions: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;

        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        }, () => {
            this.props.saveListingData({
                ...this.props.previousData,
                hashtags: this.state.tags
            })
        });
    }
    handleAddition(tag) {
        this.setState(state => {
            return { tags: [...state.tags, tag] }
        }, () => {
            this.props.saveListingData({
                ...this.props.previousData,
                hashtags: this.state.tags
            })
        });
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags }, () => {
            this.props.saveListingData({
                ...this.props.previousData,
                hashtags: newTags
            })
        });
    }
    componentDidMount() {
        const { hashtags } = this.props.previousData;
        this.setState({
            tags: typeof hashtags !== "undefined" && hashtags.length > 0 ? hashtags : []
        })
    }
    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags 
                    tags={tags}
                    classNames={{
                        tags: 'tagsClass',
                        tagInput: 'tagInputClass',
                        tagInputField: 'form-control',
                        selected: 'selectedClass',
                        tag: 'badge badge-primary',
                        remove: 'removeClass',
                        suggestions: 'suggestionsClass',
                        activeSuggestion: 'activeSuggestionClass'
                    }}
                    maxLength={10}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        previousData: _.has(state.listingData, "listingData") ? state.listingData.listingData : {}
    }
}
export default connect(mapStateToProps, { saveListingData })(CreateHashtagsListingComponent);
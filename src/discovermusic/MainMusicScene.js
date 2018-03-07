import React, { PureComponent } from 'react';
import { Text, Button, View, FlatList, ListView } from 'react-native';
import { IconMenu, Separator, ImageSwiper } from '../components';
import { screen } from '../utils';
import ListContainer from './ListContainer'
const BASE_URL = 'http://bestws.cn:3000';

// 推荐音乐
export const PERSONALIZED = BASE_URL + '/personalized';
// 独家放送
export const PERSONALIZED_PRIVATECONTENT = PERSONALIZED + '/privatecontent';
// 最新音乐
export const PERSONALIZED_NEWSONG = PERSONALIZED + '/newsong';
// 推荐mv
export const PERSONALIZED_MV = PERSONALIZED + '/mv';
// banner
export const BANNER = BASE_URL + '/banner';
// 歌单
export const PLAYLIST = BASE_URL + '/playlist';

export default class MainMusicScene extends PureComponent{
    state = {
        dataList: [],
        refreshing: true,
        banner: []
    };
    componentDidMount() {
        this.requestData();
    }
    requestData = () => {
        try {
            (async () => {
                const datas = [];
                // 推荐音乐
                const res = await fetch(PERSONALIZED);
                const personalized = await res.json();
                datas.push({
                    type: 'playlist',
                    title: '推荐音乐',
                    data: personalized.result.map(v => ({...v, title: v.name, picUrl: v.picUrl + '?param=140y140'}))
                });
                // // 独家放送
                // const res2 = await fetch(PERSONALIZED_PRIVATECONTENT);
                // const personalized_privatecontent = await res2.json();
                // datas.push({
                //     type: 'special',
                //     title: '独家放送',
                //     data: personalized_privatecontent.result.map((v, i) => ({...v, title: v.name, width: i === 2 ? 1 : 0.49}))
                // });
                // // 最新音乐
                // const res3 = await fetch(PERSONALIZED_NEWSONG);
                // const personalized_newsong = await res3.json();
                // datas.push({
                //     type: 'newsongs',
                //     title: '最新音乐',
                //     data: personalized_newsong.result.filter((v, i) => i < 6).map((v, i) => ({...v, title: v.name, subTitle: v.song.artists.map(a => a.name).join(';'), picUrl: v.song.album.picUrl + '?param=140y140'}))
                // });
                // 推荐MV
                const res4 = await fetch(PERSONALIZED_MV);
                const personalized_mv = await res4.json();
                datas.push({
                    type: 'mv',
                    title: '推荐MV',
                    data: personalized_mv.result.map((v, i) => ({...v, title: v.name, subTitle: v.artistName, picUrl: v.picUrl + '?param=140y140', width: 0.49}))
                });
                this.setState({
                    dataList: [...datas],
                    refreshing: false
                });
                this.requestBanner();

            })();
        }catch(err) {
            alert(err)
        }
    };
    requestBanner = () => {
        try {
            (
                async () => {
                    const res = await fetch(BANNER);
                    const json = await res.json();
                    this.setState({
                        banner: json.banners
                    })
                }
            )();
        } catch (err) {
            alert(err);
        }
    };
    renderHeader = () => (
        <View>
            <ImageSwiper banner={this.state.banner} />
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', height: screen.width / 4}}>
                <IconMenu icon="md-radio" title="私人FM" />
                <IconMenu icon="md-calendar" title="每日推荐" />
                <IconMenu icon="md-musical-notes" title="歌单" />
                <IconMenu icon="md-stats" title="排行榜" />
            </View>
            <Separator />
        </View>

    );
    renderItem = ({item, index}) => (
        <ListContainer title={item.title} dataList={item.data} navigation={this.props.navigation} type={item.type} />
    );
    render() {
        const { dataList, refreshing } = this.state;
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={dataList}
                    refreshing={refreshing}
                    onRefresh={this.requestData}
                    keyExtractor={(item, index) => index}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderItem}
                    ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
                />
            </View>
        )
    }
}